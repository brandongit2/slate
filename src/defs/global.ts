interface Common {
    parent: string;
    prevSibling: string;
    nextSibling: string;
}

export type Root = {
    _id: string;
    uuid: string;
    type: 'root';
    children: string[];
} & Common;

export interface IncompleteSubject {
    _id?: string;
    uuid: string;
    type: 'subject';
    name: string;
    description: string;
    color: string;
    children: string[];
}
export type Subject = IncompleteSubject & Common;

export interface IncompleteFolder {
    _id?: string;
    uuid: string;
    type: 'folder';
    name: string;
    children: string[];
}
export type Folder = IncompleteFolder & Common;

export interface IncompleteArticle {
    _id?: string;
    uuid: string;
    type: 'article';
    name: string;
    author: string;
    content: string;
}
export type Article = IncompleteArticle & Common;

export type IncompleteContent =
    | IncompleteSubject
    | IncompleteFolder
    | IncompleteArticle;
export type Content = Root | Subject | Folder | Article;
