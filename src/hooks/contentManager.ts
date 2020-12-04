import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { apiLocation } from '../config.json';
import { Action, Actions } from '../defs/contentManager';
import {
    Content,
    IncompleteContent,
    Root,
    Subject,
    Folder
} from '../defs/global';

let undoStack = [] as Action[];

export default function useContentManager(root: Root) {
    const [loadedContent, setLoadedContent] = useState([root] as Array<
        Content | Root
    >);
    const [actions, setActions] = useState([] as Action[]);

    useEffect(() => {
        for (let subject of root.children) {
            loadContent(subject);
        }
    }, []);

    function addAction(action: Action, clearUndoStack: boolean) {
        let actionsCopy = actions.slice(); // Clone array
        actionsCopy.push(action);
        setActions(actionsCopy);

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
            let nextSibling = loadedContent.find(({ uuid }) => uuid === after)
                ?.nextSibling;
            if (typeof nextSibling === 'undefined') nextSibling = '0';
            let parent = to;
            completeObject = { ...object, prevSibling, nextSibling, parent };
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
                ({ uuid }) => uuid === completeObject.prevSibling
            ).nextSibling = object.uuid;
        }
        if (completeObject.nextSibling !== '0') {
            loadedContentCopy.find(
                ({ uuid }) => uuid === completeObject.nextSibling
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
            { uuid: uuidv4(), type: Actions.REMOVE, object, from },
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
                ({ uuid }) => uuid === object.prevSibling
            );
            prevSibling.nextSibling = object.nextSibling;
        }

        if (object.nextSibling !== '0') {
            let nextSibling = loadedContentCopy.find(
                ({ uuid }) => uuid === object.nextSibling
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

    async function loadContent(uuid: string) {
        if (
            loadedContent.findIndex(
                ({ uuid: testUuid }) => testUuid === uuid
            ) !== -1
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
        loadContent
    };
}
