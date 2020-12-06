import { Content } from './global';

export enum Actions {
    ADD,
    REMOVE,
    MODIFY,
    MOVE_UP,
    MOVE_DOWN
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

export interface ActionMoveUp {
    uuid: string;
    type: Actions.MOVE_UP;
    item: string;
}

export interface ActionMoveDown {
    uuid: string;
    type: Actions.MOVE_DOWN;
    item: string;
}

export type Action =
    | ActionAdd
    | ActionRemove
    | ActionModify<Content>
    | ActionMoveUp
    | ActionMoveDown;
