import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const addOrUpdatePost = () => {
    if (title.trim() === "" || content.trim() === "") return;

    if (editId) {
      setPosts(
        posts.map((p) =>
          p.id === editId ? { ...p, title, content } : p
        )
      );
      setEditId(null);
    } else {
      const newPost = {
        id: Date.now(),
        title,
        content,
      };
      setPosts([...posts, newPost]);
    }

    setTitle("");
    setContent("");
  };

  const editPost = (id) => {
    const post = posts.find((p) => p.id === id);
    setTitle(post.title);
    setContent(post.content);
    setEditId(id);
  };

  const deletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="blog-manager">
      <h1>Content Creator Blog Manager</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={addOrUpdatePost}>
          {editId ? "Update Post" : "Add Post"}
        </button>
      </div>

      <div className="posts">
        {posts.length === 0 ? (
          <p>No posts yet. Start writing!</p>
        ) : (
          posts.map((p) => (
            <div key={p.id} className="post">
              <h3>{p.title}</h3>
              <p>{p.content}</p>
              <div className="actions">
                <button onClick={() => editPost(p.id)}>Edit</button>
                <button className="delete" onClick={() => deletePost(p.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
