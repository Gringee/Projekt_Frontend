import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('role', 'admin');
      navigate('/dashboard');
    } else if (username === 'user' && password === 'user') {
      localStorage.setItem('role', 'user');
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
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
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
