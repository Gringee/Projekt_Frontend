import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostManagement.css";

type Post = {
  id: number;
  author: string;
  content: string;
};

const PostManagement: React.FC = () => {
  const currentUser = "User1"; // Przykład zalogowanego użytkownika
  const [posts, setPosts] = useState<Post[]>([
 //   { id: 1, author: "User1", content: "This is my first post!" },
 //   { id: 2, author: "User2", content: "Hello, this is User2." },
  ]);
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  const addPost = () => {
    if (!author.trim() || !content.trim()) {
      alert("Please fill out both fields!");
      return;
    }

    const newPost: Post = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      author: author.trim(),
      content: content.trim(),
    };

    setPosts([...posts, newPost]);
    setAuthor("");
    setContent("");
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Post Management</h1>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <div className="form">
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <textarea
          rows={4}
          placeholder="Write your post here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button onClick={addPost}>Post</button>
      </div>

      <div id="post-list">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post-header">
              <span className="post-author">{post.author}</span>
              {post.author === currentUser && (
                <button
                  className="delete-btn"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              )}
            </div>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostManagement;
