import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h2>{role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}</h2>
      <button onClick={handleLogout}>Logout</button>
      {role === 'admin' ? (
        <div>Welcome, Admin! You have full access.</div>
      ) : (
        <div>Welcome, User! You have limited access.</div>
      )}
    </div>
  );
};

export default Dashboard;
