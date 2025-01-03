import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from '../types';

const AddPhotoPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [user, setUser] = useState<string>('currentUser');  // Na przykładzie, że użytkownik jest zawsze "currentUser"
  const [images, setImages] = useState<Image[]>([]);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) return;

    const newImage: Image = {
      id: `${images.length + 1}`,  // Prosty sposób generowania ID
      name: name,
      url: URL.createObjectURL(file),  // Lokalny URL dla obrazu
      user: user,
    };

    setImages([...images, newImage]);
    navigate('/');  // Przekierowanie na stronę główną
  };

  return (
    <div>
      <h1>Dodaj nowe zdjęcie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nazwa zdjęcia"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Dodaj zdjęcie</button>
      </form>
    </div>
  );
};

export default AddPhotoPage;
