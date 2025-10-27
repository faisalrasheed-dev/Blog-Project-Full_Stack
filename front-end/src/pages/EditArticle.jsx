import axios from 'axios';
import { redirect, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../UserContext';
import ArticleForm from '../components/ArticleForm';

const API_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_URL_LOCAL
  : import.meta.env.VITE_API_URL;

const EditArticle = () => {
  const article = useLoaderData();
  const { id } = useParams();
  const { isLoading: userLoading, user } = useUser();
  const navigate=useNavigate()
  const handleEdit = async (title,content) => {
    const token = localStorage.getItem('authtoken')



    try {
      const headers = { authtoken: token };
      await axios.put(`${API_URL}/api/articles/edit-article/${id}`, {title, content }, { headers });
      navigate(`/articles/${id}`);
    } catch (e) {
      console.log(e);
      alert("Failed to update article");
    }
  };
  if (userLoading || !article) return <div>Loading...</div>;

  return (
    <ArticleForm onSubmit={handleEdit} initialData={{title:article.articleName,content:article.content}} userLoading={userLoading} />
  );
};

export async function loader({ params }) {
  const token=localStorage.getItem('authtoken')
   if (!token) {
    return redirect('/login')
  }
  const headers = { authtoken: token }
  const response = await axios.get(`${API_URL}/api/articles/${params.id}`,{headers});
  return response.data.article;
}

export default EditArticle;
