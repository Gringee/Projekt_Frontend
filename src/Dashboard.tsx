import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username') || 'User';
  const [users, setUsers] = useState<{ username: string; role: string }[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(users);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleDelete = (username: string) => {
    const updatedUsers = users.filter(user => user.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const filteredUsers = users.filter(user => user.username.includes(search));

  const handleNavigateToFeed = () => {
    navigate('/feed');
  };

  const handleNavigateToPosts = () => {
    navigate('/posts');
  };

  const handleNavigateToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="dashboard-container">
      <h2>{role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}</h2>
      <button onClick={handleLogout}>Logout</button>
      {role === 'admin' ? (
        <div>
          <input
            type="text"
            placeholder="Search users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul>
            {filteredUsers.map((user, index) => (
              <li key={index}>
                {user.username} ({user.role})
                <button onClick={() => handleDelete(user.username)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="welcome-message">
          Welcome, <span className="username">{username}</span>! You have limited access.
        </div>
      )}
      <button onClick={handleNavigateToFeed}>Go to Feed</button>
      <button onClick={handleNavigateToPosts}>Go to Posts</button>
      <button onClick={handleNavigateToProfile}>Go to MyProfile</button>
    </div>
  );
};

export default Dashboard;
