export interface Subject {
    _id?: string;
    type: 'subject';
    name: string;
    description: string;
    color: string;
}

export interface Folder {
    _id?: string;
    type: 'folder';
    name: string;
}

export interface Article {
    _id?: string;
    type: 'article';
    title: string;
    content: string;
}

export interface SubjectWithChildren extends Subject {
    children: Array<Folder | FolderWithChildren | Article>;
}

export interface FolderWithChildren extends Folder {
    children: Array<Folder | FolderWithChildren | Article>;
}
