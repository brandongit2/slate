export interface Subject {
    _id: string;
    name: string;
    description: string;
    color: string;
}

export interface Folder {
    _id: string;
    type: 'folder';
    name: string;
}

export interface Article {
    _id: string;
    type: 'article';
    title: string;
    content: string;
}

export interface SubjectWithChildren extends Subject {
    children: Array<Folder | Article>;
}
