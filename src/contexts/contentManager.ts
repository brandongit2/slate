import {createContext} from 'react';
import {Action} from '../defs/contentManager';
import {Content, IncompleteContent, Root} from '../defs/content';

export const ContentManagerContext = createContext({
    user: {name: '' as string},
    actions: undefined as Action<Content>[],
    loadedContent: undefined as Array<Content | Root>,
    loadContent: undefined as (uuid: string) => void,
    fns: {
        addObject: undefined as (
            object: IncompleteContent | Content,
            to: string,
            after: string,
            clearUndoStack?: boolean
        ) => void,
        removeObject: undefined as (
            object: Content,
            from: string,
            clearUndoStack?: boolean
        ) => void,
        modifyObject: undefined as <T extends Content>(
            from: T,
            to: T,
            clearUndoStack?: boolean
        ) => void,
        moveObjectDown: undefined as (
            object: Content,
            clearUndoStack?: boolean
        ) => void,
        moveObjectUp: undefined as (
            object: Content,
            clearUndoStack?: boolean
        ) => void
    }
});
