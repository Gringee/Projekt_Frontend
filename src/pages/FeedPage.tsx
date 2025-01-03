import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, Folder } from '../types';

const FeedPage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [currentView, setCurrentView] = useState<'folders' | 'all'>('all');
  const [userFilter, setUserFilter] = useState<string>('');
  const currentUser = localStorage.getItem('username') || 'guest';

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('images') || '[]');
    const storedFolders = JSON.parse(localStorage.getItem('folders') || '[]');
    setImages(storedImages);
    setFolders(storedFolders);
  }, []);

  const handleUserFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFilter(e.target.value);
  };

  const filteredImages = images.filter(image => 
    (userFilter ? image.user === userFilter : true)
  );

  const handleDelete = (id: string) => {
    const updatedImages = images.filter(image => image.id !== id);
    setImages(updatedImages);
    localStorage.setItem('images', JSON.stringify(updatedImages));
    alert('Zdjęcie usunięte');
  };

  return (
    <div>
      <h1>Feed ze zdjęciami</h1>

      <div>
        <button onClick={() => setCurrentView('all')}>Wszystkie zdjęcia</button>
        <button onClick={() => setCurrentView('folders')}>Przeglądaj foldery</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Filtruj po użytkowniku"
          value={userFilter}
          onChange={handleUserFilterChange}
        />
      </div>

      {currentView === 'folders' && (
        <div>
          <h2>Foldery</h2>
          {folders.map(folder => (
            <div key={folder.id}>
              <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
            </div>
          ))}
        </div>
      )}

      {currentView === 'all' && (
        <div>
          <h2>Zdjęcia</h2>
          {filteredImages.map(image => (
            <div key={image.id}>
              <img src={image.url} alt={image.name} />
              <p>{image.name}</p>
              <p>Autor: {image.user}</p>
              {image.user === currentUser && (
                <button onClick={() => handleDelete(image.id)}>Usuń</button>
              )}
            </div>
          ))}
        </div>
      )}

      <Link to="/add-photo">Dodaj nowe zdjęcie</Link>
    </div>
  );
};

export default FeedPage;