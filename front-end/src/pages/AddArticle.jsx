import axios from 'axios';
import { useUser } from '../UserContext';
import ArticleForm from '../components/ArticleForm';

const API_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_URL_LOCAL
  : import.meta.env.VITE_API_URL;

export const AddArticle = () => {
  const { isLoading: userLoading, user } = useUser();

  const articleUpload = async (title, content) => {
    const token = await user.getIdToken();
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

  return <ArticleForm onSubmit={articleUpload} userLoading={userLoading} />;
};
