import {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import {apiLocation} from '../config.json';
import {Action, Actions} from '../defs/contentManager';
import {
    Content,
    IncompleteContent,
    Root,
    Subject,
    Folder
} from '../defs/content';

let undoStack = [] as Action<Content>[];

export function useContentManager(root: Root) {
    const [loadedContent, setLoadedContent] = useState([root] as Array<
        Content | Root
    >);
    const [actions, setActions] = useState([] as Action<Content>[]);

    useEffect(() => {
        for (let subject of root.children) {
            loadContent(subject);
        }
    }, []);

    function addAction<T extends Content>(
        action: Action<T>,
        clearUndoStack: boolean
    ) {
        setActions((prevState) => [...prevState, action]);
        if (clearUndoStack) undoStack = [];
    }

    function removeAction(idx: number) {
        let actionsCopy = actions.slice(); // Clone array
        actionsCopy.splice(idx, 1);
        setActions(actionsCopy);
    }

    function undo() {
        let action = actions[actions.length - 1];

        switch (action.type) {
            case Actions.ADD: {
                removeObject(action.object, action.to, false);
                break;
            }
            case Actions.REMOVE: {
                addObject(
                    action.object,
                    action.from,
                    action.object.prevSibling,
                    false
                );
                break;
            }
            case Actions.MODIFY: {
                modifyObject(action.to, action.from, false);
                break;
            }
            case Actions.MOVE_UP: {
                moveObjectDown(action.object, false);
                break;
            }
            case Actions.MOVE_DOWN: {
                moveObjectUp(action.object, false);
                break;
            }
            default:
                return;
        }

        removeAction(actions.length - 1);

        undoStack.push(actions[actions.length - 1]);
        removeAction(actions.length - 1);
    }

    function redo() {
        let action = undoStack.pop();

        switch (action.type) {
            case Actions.ADD: {
                addObject(action.object, action.to, action.after, false);
                break;
            }
            case Actions.REMOVE: {
                removeObject(action.object, action.from, false);
                break;
            }
            case Actions.MODIFY: {
                modifyObject(action.from, action.to, false);
                break;
            }
            case Actions.MOVE_UP: {
                moveObjectUp(action.object, false);
                break;
            }
            case Actions.MOVE_DOWN: {
                moveObjectDown(action.object, false);
                break;
            }
        }
    }

    function addObject(
        object: IncompleteContent | Content,
        to: string,
        after: string,
        clearUndoStack = true
    ) {
        let completeObject: Content;
        if ('prevSibling' in object) {
            completeObject = object;
        } else {
            let prevSibling = after;
            let nextSibling = loadedContent.find(({uuid}) => uuid === after)
                ?.nextSibling;
            if (typeof nextSibling === 'undefined') nextSibling = '0';
            let parent = to;
            completeObject = {...object, prevSibling, nextSibling, parent};
        }

        addAction(
            {
                uuid: uuidv4(),
                type: Actions.ADD,
                object: completeObject,
                to,
                after
            },
            clearUndoStack
        );

        let loadedContentCopy = loadedContent.slice();
        loadedContentCopy.push(completeObject);

        let parent = loadedContentCopy.find(
            (content) => content.uuid === to
        ) as Root | Subject | Folder;

        if (completeObject.prevSibling !== '0') {
            loadedContentCopy.find(
                ({uuid}) => uuid === completeObject.prevSibling
            ).nextSibling = object.uuid;
        }
        if (completeObject.nextSibling !== '0') {
            loadedContentCopy.find(
                ({uuid}) => uuid === completeObject.nextSibling
            ).prevSibling = object.uuid;
        }

        let idx: number;
        if (after === '0') {
            idx = 0;
        } else {
            idx = parent.children.findIndex((uuid) => uuid === after) + 1;
        }

        parent.children.splice(idx, 0, object.uuid);

        setLoadedContent(loadedContentCopy);
    }

    function removeObject(
        object: Content,
        from: string,
        clearUndoStack = true
    ) {
        addAction(
            {uuid: uuidv4(), type: Actions.REMOVE, object, from},
            clearUndoStack
        );

        let loadedContentCopy = loadedContent.slice();
        let idx = loadedContentCopy.findIndex(
            (content) => content.uuid === object.uuid
        );
        loadedContentCopy.splice(idx, 1);

        let parent = loadedContentCopy.find((content) => content.uuid === from);
        if (parent.type === 'article') throw new Error('Invalid parent.');
        idx = parent.children.findIndex((uuid) => uuid === object.uuid);
        parent.children.splice(idx, 1);

        if (object.prevSibling !== '0') {
            let prevSibling = loadedContentCopy.find(
                ({uuid}) => uuid === object.prevSibling
            );
            prevSibling.nextSibling = object.nextSibling;
        }

        if (object.nextSibling !== '0') {
            let nextSibling = loadedContentCopy.find(
                ({uuid}) => uuid === object.nextSibling
            );
            nextSibling.prevSibling = object.prevSibling;
        }

        setLoadedContent(loadedContentCopy);
    }

    function modifyObject<T extends Content>(
        from: T,
        to: T,
        clearUndoStack = true
    ) {
        addAction(
            {
                uuid: uuidv4(),
                type: Actions.MODIFY,
                from,
                to
            },
            clearUndoStack
        );

        let loadedContentCopy = loadedContent.slice();
        let idx = loadedContentCopy.findIndex(
            (content) => content.uuid === from.uuid
        );
        loadedContentCopy[idx] = to;

        setLoadedContent(loadedContentCopy);
    }

    function moveObjectUp(object: Content, clearUndoStack = true) {
        let item = loadedContent.find(({uuid}) => uuid === object.uuid);
        if (item.prevSibling === '0') return; // Soft fail

        addAction(
            {uuid: uuidv4(), type: Actions.MOVE_UP, object},
            clearUndoStack
        );

        let parent = loadedContent.find(({uuid}) => uuid === item.parent) as
            | Root
            | Subject
            | Folder;
        let idx = parent.children.findIndex((child) => child === object.uuid);
        let temp = parent.children[idx];
        parent.children[idx] = parent.children[idx - 1];
        parent.children[idx - 1] = temp;

        // Update sibling two items above
        let prevItem = loadedContent.find(
            ({uuid}) => uuid === item.prevSibling
        );
        if (prevItem.prevSibling !== '0')
            loadedContent.find(
                ({uuid}) => uuid === prevItem.prevSibling
            ).nextSibling = object.uuid;

        // Update previous and next siblings
        if (item.nextSibling !== '0')
            loadedContent.find(
                ({uuid}) => uuid === item.nextSibling
            ).prevSibling = item.prevSibling;

        prevItem.nextSibling = item.nextSibling;
        prevItem.prevSibling = object.uuid;

        // Update item itself
        item.nextSibling = item.prevSibling;
        item.prevSibling =
            loadedContent.find(({uuid}) => uuid === parent.children[idx - 2])
                ?.uuid || '0';

        setLoadedContent(loadedContent.slice());
    }

    function moveObjectDown(object: Content, clearUndoStack = true) {
        let item = loadedContent.find(
            ({uuid: testUuid}) => testUuid === object.uuid
        );
        if (item.nextSibling === '0') return; // Soft fail

        addAction(
            {uuid: uuidv4(), type: Actions.MOVE_DOWN, object},
            clearUndoStack
        );

        let parent = loadedContent.find(({uuid}) => uuid === item.parent) as
            | Root
            | Subject
            | Folder;
        let idx = parent.children.findIndex((child) => child === object.uuid);
        let temp = parent.children[idx];
        parent.children[idx] = parent.children[idx + 1];
        parent.children[idx + 1] = temp;

        // Update sibling two items below
        let nextItem = loadedContent.find(
            ({uuid}) => uuid === item.nextSibling
        );
        if (nextItem.nextSibling !== '0')
            loadedContent.find(
                ({uuid}) => uuid === nextItem.nextSibling
            ).prevSibling = object.uuid;

        // Update previous and next siblings
        if (item.prevSibling !== '0')
            loadedContent.find(
                ({uuid}) => uuid === item.prevSibling
            ).nextSibling = item.nextSibling;

        nextItem.prevSibling = item.prevSibling;
        nextItem.nextSibling = object.uuid;

        // Update item itself
        item.prevSibling = item.nextSibling;
        item.nextSibling =
            loadedContent.find(({uuid}) => uuid === parent.children[idx + 2])
                ?.uuid || '0';

        setLoadedContent(loadedContent.slice());
    }

    async function loadContent(uuid: string) {
        if (
            loadedContent.findIndex(({uuid: testUuid}) => testUuid === uuid) !==
            -1
        )
            return;

        let loadedContentCopy = loadedContent.slice();
        loadedContentCopy.push(
            await (await fetch(`${apiLocation}/content/${uuid}`)).json()
        );
        setLoadedContent(loadedContentCopy);
    }

    return {
        undoStack,
        actions,
        loadedContent,
        undo,
        redo,
        addObject,
        removeObject,
        modifyObject,
        moveObjectUp,
        moveObjectDown,
        loadContent
    };
}
