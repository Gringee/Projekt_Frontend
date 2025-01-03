import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PostManagement.css";

type Post = {
  id: number;
  author: string;
  content: string;
  comments: Comment[];
};

type Comment = {
  id: number;
  author: string;
  content: string;
};

const PostManagement: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState<string>("");
  const [commentContent, setCommentContent] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(savedPosts);
    const username = localStorage.getItem('username');
    if (username) {
      setCurrentUser(username);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const addPost = () => {
    if (!content.trim()) {
      alert("Please fill out the content field!");
      return;
    }

    const newPost: Post = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      author: currentUser,
      content: content.trim(),
      comments: [],
    };

    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setContent("");
  };

  const deletePost = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const addComment = (postId: number) => {
    if (!commentContent[postId]?.trim()) {
      alert("Please enter a comment!");
      return;
    }

    const newComment: Comment = {
      id: Date.now(),
      author: currentUser,
      content: commentContent[postId].trim(),
    };

    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setCommentContent(prev => ({ ...prev, [postId]: "" }));
  };

  const deleteComment = (postId: number, commentId: number) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, comments: post.comments.filter(comment => comment.id !== commentId) } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Post Management</h1>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <div className="form">
        <p>Logged in as: <strong>{currentUser}</strong></p>
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
            <div className="comments">
              {post.comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <div className="comment-content">
                    <span className="comment-author">{comment.author} <span className="comment-label">(comment)</span></span>
                    <p>{comment.content}</p>
                  </div>
                  {comment.author === currentUser && (
                    <button
                      className="delete-btn comment-delete-btn"
                      onClick={() => deleteComment(post.id, comment.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
              <div className="add-comment">
                <textarea
                  rows={2}
                  placeholder="Add a comment..."
                  value={commentContent[post.id] || ""}
                  onChange={(e) => setCommentContent(prev => ({ ...prev, [post.id]: e.target.value }))}
                />
                <button onClick={() => addComment(post.id)}>Comment</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostManagement;
