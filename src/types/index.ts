export interface Image {
  id: string;
  name: string;
  url: string;
  user: string;
  folderId?: string; // Dodano opcjonalne folderId
}

export interface Folder {
  id: string;
  name: string;
}

  