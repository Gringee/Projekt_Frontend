import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PostManagement from "./PostManagement";
import FeedPage from './pages/FeedPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/posts" element={<PostManagement />} />
          <Route path="/feed" element={<FeedPage />} /> {/* Upewnij się, że ta ścieżka jest poprawna */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
