import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Image, Folder } from '../types';
import './FeedPage.css';

const FeedPage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [currentView, setCurrentView] = useState<'folders' | 'all' | 'folder'>('all');
  const [userFilter, setUserFilter] = useState<string>('');
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const currentUser = localStorage.getItem('username') || 'guest';
  const navigate = useNavigate();
  const { folderId } = useParams<{ folderId: string }>();

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('images') || '[]');
    const storedFolders = JSON.parse(localStorage.getItem('folders') || '[]');
    setImages(storedImages);
    setFolders(storedFolders);
  }, []);

  useEffect(() => {
    if (folderId) {
      const folder = folders.find(f => f.id === folderId);
      setSelectedFolder(folder || null);
      setCurrentView('folder');
    }
  }, [folderId, folders]);

  const handleUserFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFilter(e.target.value);
  };

  const filteredImages = images.filter(image => 
    (userFilter ? image.user === userFilter : true) &&
    (selectedFolder ? image.folderId === selectedFolder.id : true)
  );

  const handleDelete = (id: string) => {
    const updatedImages = images.filter(image => image.id !== id);
    setImages(updatedImages);
    localStorage.setItem('images', JSON.stringify(updatedImages));
    alert('Photo deleted');
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleBackToFolders = () => {
    navigate('/feed');
    setSelectedFolder(null);
    setCurrentView('folders');
  };

  return (
    <div className="feed-container">
      <h1>Photo Feed</h1>
      <p>Logged in as: <strong>{currentUser}</strong></p>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <button className="back-btn" onClick={handleBackToDashboard}>Back to Dashboard</button>

      <div>
        <button className="view-btn" onClick={() => setCurrentView('all')}>All Photos</button>
        <button className="view-btn" onClick={() => setCurrentView('folders')}>Browse Folders</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Filter by user"
          value={userFilter}
          onChange={handleUserFilterChange}
        />
      </div>

      {currentView === 'folders' && (
        <div>
          <h2>Folders</h2>
          {folders.map(folder => (
            <div key={folder.id}>
              <button className="folder-link" onClick={() => navigate(`/folder/${folder.id}`)}>{folder.name}</button>
            </div>
          ))}
          <Link to="/manage-folders" className="edit-folders-link">Edit folders</Link>
        </div>
      )}

      {currentView === 'folder' && selectedFolder && (
        <div>
          <h2>Photos in {selectedFolder.name}</h2>
          <button className="back-btn" onClick={handleBackToFolders}>Back to Folders</button>
          {filteredImages.map(image => (
            <div key={image.id} className="image-item">
              <img src={image.url} alt={image.name} />
              <p>{image.name}</p>
              <p>Author: {image.user}</p>
              {image.user === currentUser && (
                <button className="delete-btn" onClick={() => handleDelete(image.id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      )}

      {currentView === 'all' && (
        <div>
          <h2>Photos</h2>
          {filteredImages.map(image => (
            <div key={image.id} className="image-item">
              <img src={image.url} alt={image.name} />
              <p>{image.name}</p>
              <p>Author: {image.user}</p>
              {image.user === currentUser && (
                <button className="delete-btn" onClick={() => handleDelete(image.id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      )}

      <Link to="/add-photo" className="add-photo-link">Add New Photo</Link>
    </div>
  );
};

export default FeedPage;