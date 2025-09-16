import axios from 'axios';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import ArticleForm from '../components/ArticleForm';

const API_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_URL_LOCAL
  : import.meta.env.VITE_API_URL;

export const AddArticle = () => {
  const { isLoading: userLoading, user } = useUser();
  const navigate=useNavigate()
 
    useEffect(() => {
  if (!user && !userLoading) {
    navigate("/login");
  }
}, [user, userLoading, navigate]);

  const articleUpload = async (title,content) => {
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

  return (
    <ArticleForm onSubmit={articleUpload} userLoading={userLoading}/>
  );
};
