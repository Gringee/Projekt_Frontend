export type Image = {
    id: string;
    name: string;
    url: string;
    user: string;
    folderId?: string;
};

export type Folder = {
    id: string;
    name: string;
};

export type Post = {
    id: number;
    author: string;
    content: string;
    comments: Comment[];
};

export type Comment = {
    id: number;
    author: string;
    content: string;
};
