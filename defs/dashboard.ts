import { Content } from '../defs/global';

export enum Actions {
    ADD,
    REMOVE,
    CHANGE,
    REORDER
}

export interface ActionAdd {
    uuid: string;
    type: Actions.ADD;
    object: Content;
    to: string;
}

export interface ActionRemove {
    uuid: string;
    type: Actions.REMOVE;
    object: Content;
    from: string;
}

export interface ActionChange {
    uuid: string;
    type: Actions.CHANGE;
    object: string;
    changedFields: { [key: string]: any };
}

export interface ActionReorder {
    uuid: string;
    type: Actions.REORDER;
    parent: string;
    newOrder: string[]; // The new list of ObjectIDs for parent.children
}

export type Action = ActionAdd | ActionRemove | ActionChange | ActionReorder;
