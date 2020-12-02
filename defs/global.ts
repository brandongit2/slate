export interface Subject {
    _id?: string;
    uuid: string;
    type: 'subject';
    name: string;
    description: string;
    color: string;
    children: string[];
}

export interface Folder {
    _id?: string;
    uuid: string;
    type: 'folder';
    name: string;
    children: string[];
}

export interface Article {
    _id?: string;
    uuid: string;
    type: 'article';
    name: string;
    author: string;
    content: string;
}

export type Content = Subject | Folder | Article;
