import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const adminExists = users.some((u: { username: string }) => u.username === 'admin');
    if (!adminExists) {
      users.push({ username: 'admin', password: 'admin', role: 'admin' });
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: { username: string; password: string }) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.username);
      if (user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/posts');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  const handleRegister = () => {
    if (username.length < 4 || password.length < 4) {
      setError('Username and password must be at least 4 characters long');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((u: { username: string }) => u.username === username);
    if (userExists) {
      setError('User already exists');
    } else {
      users.push({ username, password, role: 'user' });
      localStorage.setItem('users', JSON.stringify(users));
      setSuccess('User registered successfully');
      setTimeout(() => setSuccess(''), 3000); // Hide success message after 3 seconds
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Login;
