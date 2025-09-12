import axios from 'axios';
import { useState,useEffect } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const API_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_URL_LOCAL
  : import.meta.env.VITE_API_URL;

export const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoading: userLoading, user } = useUser();
  const navigate=useNavigate()
 
    useEffect(() => {
  if (!user && !userLoading) {
    navigate("/login");
  }
}, [user, userLoading, navigate]);

  const articleUpload = async () => {
    const token = user && await user.getIdToken();
    if(!token){ 
         return alert("user not login")
    }
    const headers = { authtoken: token };
    try {
      const response = await axios.post(`${API_URL}/api/addarticle`, { title, content }, { headers });
      if (response.data.success) {
        alert(response.data.message || "Article Added Successfully");
      }
    } catch (e) {
      console.log(e);
      alert(e.response?.data?.message || "Failed to add article");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!title.trim() || !content.trim()) return;
    const wordCount = content.trim().split(/\s+/).length;
    if (wordCount < 50) {
      alert("Content Must contain 50 words");
      return;
    }
    setLoading(true);
    await articleUpload();
    setContent('');
    setTitle('');
    setLoading(false);
  };

  return (
    <div>
      <h1>Fill this</h1>
      <li>
        <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
      </li>
      <ReactQuill placeholder="Write Your Content Here" value={content} onChange={setContent} />
      <button onClick={handleSubmit} disabled={loading || userLoading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};
