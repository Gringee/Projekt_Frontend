import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Folder } from '../types';

const AddPhotoPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [folderId, setFolderId] = useState<string>('');
  const [folders, setFolders] = useState<Folder[]>([]);
  const currentUser = localStorage.getItem('username') || 'guest';
  const navigate = useNavigate();

  useEffect(() => {
    const storedFolders = JSON.parse(localStorage.getItem('folders') || '[]');
    setFolders(storedFolders);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) return;

    const newImage: Image = {
      id: `${Date.now()}`,
      name: name,
      url: URL.createObjectURL(file),
      user: currentUser,
      folderId: folderId,
    };

    const updatedImages = [...JSON.parse(localStorage.getItem('images') || '[]'), newImage];
    localStorage.setItem('images', JSON.stringify(updatedImages));
    navigate('/feed');
  };

  return (
    <div>
      <h1>Add New Photo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Photo Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <select value={folderId} onChange={(e) => setFolderId(e.target.value)}>
          <option value="">Select Folder</option>
          {folders.map(folder => (
            <option key={folder.id} value={folder.id}>{folder.name}</option>
          ))}
        </select>
        <button type="submit">Add Photo</button>
      </form>
    </div>
  );
};

export default AddPhotoPage;