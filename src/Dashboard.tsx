import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [users, setUsers] = useState<{ username: string; role: string }[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(users);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleDelete = (username: string) => {
    const updatedUsers = users.filter(user => user.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const filteredUsers = users.filter(user => user.username.includes(search));

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
        <div>Welcome, User! You have limited access.</div>
      )}
    </div>
  );
};

export default Dashboard;
