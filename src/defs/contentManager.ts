import {Content} from './content';

export enum Actions {
    ADD,
    REMOVE,
    MODIFY,
    MOVE_UP,
    MOVE_DOWN
}

export interface ActionAdd<T extends Content> {
    uuid: string;
    type: Actions.ADD;
    object: T;
    to: string;
    after: string;
}

export interface ActionRemove<T extends Content> {
    uuid: string;
    type: Actions.REMOVE;
    object: T;
    from: string;
}

export interface ActionModify<T extends Content> {
    uuid: string;
    type: Actions.MODIFY;
    from: T;
    to: T;
}

export interface ActionMoveUp<T extends Content> {
    uuid: string;
    type: Actions.MOVE_UP;
    object: T;
}

export interface ActionMoveDown<T extends Content> {
    uuid: string;
    type: Actions.MOVE_DOWN;
    object: T;
}

export type Action<T extends Content> =
    | ActionAdd<T>
    | ActionRemove<T>
    | ActionModify<T>
    | ActionMoveUp<T>
    | ActionMoveDown<T>;
