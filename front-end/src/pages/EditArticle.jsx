import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { useNavigate, useLoaderData, useParams } from 'react-router-dom';
import { useUser } from '../UserContext';

const API_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_URL_LOCAL
  : import.meta.env.VITE_API_URL;

const EditArticle = () => {
  const article = useLoaderData();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoading: userLoading, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (article) {
      setTitle(article.articleName);
      setContent(article.content);
    }
  }, [article]);

  useEffect(() => {
    if (!user && !userLoading) {
      navigate("/login");
    }
  }, [user, userLoading, navigate]);

  const handleEdit = async () => {
    const token = localStorage.getItem("authtoken");
    if (!token) return navigate('/login');

    try {
      const headers = { authtoken: token };
      await axios.put(`${API_URL}/api/articles/edit-article/${id}`, { title, content }, { headers });
      navigate(`/articles/${id}`);
    } catch (e) {
      console.log(e);
      alert("Failed to update article");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!title.trim() || !content.trim()) return;
    if (content.trim().split(/\s+/).length < 50) {
      alert("Content must contain at least 50 words");
      return;
    }
    setLoading(true);
    await handleEdit();
    setLoading(false);
  };

  if (userLoading || !article) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Article</h1>
      <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
      <ReactQuill placeholder="Write Your Content Here" value={content} onChange={setContent} />
      <button onClick={handleSubmit} disabled={loading || userLoading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export async function loader({ params }) {
  const response = await axios.get(`${API_URL}/api/articles/${params.id}`);
  return response.data;
}

export default EditArticle;
