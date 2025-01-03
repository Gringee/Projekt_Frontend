import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Post } from '../types';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<{ username: string; role: string } | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const currentUser = localStorage.getItem('username') || 'guest';
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: { username: string }) => u.username === currentUser);
    setUserData(user || null);

    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(storedPosts.filter((post: Post) => post.author === currentUser));

    const storedImages = JSON.parse(localStorage.getItem('images') || '[]');
    setImages(storedImages.filter((image: Image) => image.user === currentUser));
  }, [currentUser]);

  const handleUpdateUser = () => {
    if (!newUsername.trim() || !newPassword.trim()) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((user: { username: string; password: string; role: string }) =>
      user.username === currentUser ? { ...user, username: newUsername, password: newPassword } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('username', newUsername);
    setUserData({ ...userData, username: newUsername } as { username: string; role: string });
    setNewUsername('');
    setNewPassword('');
    alert('User data updated');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <p>Logged in as: <strong>{currentUser}</strong></p>
      <button className="back-btn" onClick={handleBackToDashboard}>Back to Dashboard</button>

      {userData && (
        <div className="user-data">
          <h2>User Data</h2>
          <p>Username: {userData.username}</p>
          <p>Role: {userData.role}</p>
          <input
            type="text"
            placeholder="New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleUpdateUser}>Update User Data</button>
        </div>
      )}

      <div className="user-posts">
        <h2>My Posts</h2>
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      <div className="user-photos">
        <h2>My Photos</h2>
        {images.map(image => (
          <div key={image.id} className="photo-item">
            <img src={image.url} alt={image.name} />
            <p>{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
