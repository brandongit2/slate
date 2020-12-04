import { Content } from './global';

export enum Actions {
    ADD,
    REMOVE,
    MODIFY,
    REORDER
}

export interface ActionAdd {
    uuid: string;
    type: Actions.ADD;
    object: Content;
    to: string;
    after: string;
}

export interface ActionRemove {
    uuid: string;
    type: Actions.REMOVE;
    object: Content;
    from: string;
}

export interface ActionModify<T extends Content> {
    uuid: string;
    type: Actions.MODIFY;
    from: T;
    to: T;
}

export interface ActionReorder {
    uuid: string;
    type: Actions.REORDER;
    parent: string;
    newOrder: string[]; // The new list of ObjectIDs for parent.children
}

export type Action =
    | ActionAdd
    | ActionRemove
    | ActionModify<Content>
    | ActionReorder;
