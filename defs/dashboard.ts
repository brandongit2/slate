import { Folder, Subject, Article } from '../defs/global';

export enum Actions {
    ADD,
    REMOVE,
    CHANGE,
    REORDER
}

// Starting from subject name, list folder names until we reach the desired object.
export type Directory = ['root', ...string[]];

export interface ActionAdd {
    uuid: string;
    type: Actions.ADD;
    object: Subject | Folder | Article;
    to: Directory;
}

export interface ActionRemove {
    uuid: string;
    type: Actions.REMOVE;
    object: Subject | Folder | Article;
    from: Directory;
}

export interface ActionChange {
    uuid: string;
    type: Actions.CHANGE;
    object: Directory;
    changedFields: { [key: string]: any };
}

export interface ActionReorder {
    uuid: string;
    type: Actions.REORDER;
    parent: Directory;
    newOrder: string[]; // The new list of ObjectIDs for parent.children
}

export type Action = ActionAdd | ActionRemove | ActionChange | ActionReorder;
