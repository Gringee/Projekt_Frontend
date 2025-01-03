export interface Image {
  id: string;
  name: string;
  url: string;
  user: string;
  folderId?: string;
}

export interface Folder {
  id: string;
  name: string;
}

export interface Post {
  id: number;
  author: string;
  content: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  author: string;
  content: string;
}

