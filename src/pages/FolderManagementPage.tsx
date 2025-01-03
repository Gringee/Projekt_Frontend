import React, { useState, useEffect } from 'react';
import { Folder as FolderType } from '../types';

const FolderManagementPage: React.FC = () => {
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [folderName, setFolderName] = useState<string>('');
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);

  useEffect(() => {
    const storedFolders = JSON.parse(localStorage.getItem('folders') || '[]');
    setFolders(storedFolders);
  }, []);

  const handleAddFolder = () => {
    if (!folderName.trim()) return;
    const newFolder: FolderType = {
      id: `${Date.now()}`,
      name: folderName,
    };
    const updatedFolders = [...folders, newFolder];
    setFolders(updatedFolders);
    localStorage.setItem('folders', JSON.stringify(updatedFolders));
    setFolderName('');
  };

  const handleEditFolder = (id: string) => {
    const folderToEdit = folders.find(folder => folder.id === id);
    if (folderToEdit) {
      setEditingFolderId(id);
      setFolderName(folderToEdit.name);
    }
  };

  const handleUpdateFolder = () => {
    if (!editingFolderId || !folderName.trim()) return;
    const updatedFolders = folders.map(folder => 
      folder.id === editingFolderId ? { ...folder, name: folderName } : folder
    );
    setFolders(updatedFolders);
    localStorage.setItem('folders', JSON.stringify(updatedFolders));
    setFolderName('');
    setEditingFolderId(null);
  };

  const handleDeleteFolder = (id: string) => {
    const updatedFolders = folders.filter(folder => folder.id !== id);
    setFolders(updatedFolders);
    localStorage.setItem('folders', JSON.stringify(updatedFolders));
  };

  return (
    <div>
      <h1>Manage Folders</h1>
      <div>
        <input
          type="text"
          placeholder="Nazwa folderu"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        {editingFolderId ? (
          <button onClick={handleUpdateFolder}>Update Folder</button>
        ) : (
          <button onClick={handleAddFolder}>Add Folder</button>
        )}
      </div>
      <ul>
        {folders.map(folder => (
          <li key={folder.id}>
            {folder.name}
            <button onClick={() => handleEditFolder(folder.id)}>Edit</button>
            <button onClick={() => handleDeleteFolder(folder.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderManagementPage;
