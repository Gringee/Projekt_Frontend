import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Folder } from '../types';

const FeedPage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [folders] = useState<Folder[]>([  // Foldery są statyczne w tym przypadku
    { id: '1', name: 'Folder 1' },
    { id: '2', name: 'Folder 2' },
  ]);
  const [userFilter, setUserFilter] = useState<string>('');

  const handleUserFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFilter(e.target.value);
  };

  const filteredImages = images.filter(image => 
    userFilter ? image.user === userFilter : true
  );

  const handleDelete = (id: string) => {
    setImages(images.filter(image => image.id !== id));
    alert('Zdjęcie usunięte');
  };

  return (
    <div>
      <h1>Feed z zdjęciami</h1>
      
      <div>
        <input
          type="text"
          placeholder="Filtruj po użytkowniku"
          value={userFilter}
          onChange={handleUserFilterChange}
        />
      </div>
      
      <div>
        <h2>Foldery</h2>
        {folders.map(folder => (
          <div key={folder.id}>
            <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
          </div>
        ))}
      </div>

      <div>
        <h2>Zdjęcia</h2>
        {filteredImages.map(image => (
          <div key={image.id}>
            <img src={image.url} alt={image.name} />
            <p>{image.name}</p>
            <p>Autor: {image.user}</p>
            {/* Add delete button only for user's own images */}
            {image.user === 'currentUser' && (
              <button onClick={() => handleDelete(image.id)}>Usuń</button>
            )}
          </div>
        ))}
      </div>

      <Link to="/add-photo">Dodaj nowe zdjęcie</Link>
    </div>
  );
};

export default FeedPage;
