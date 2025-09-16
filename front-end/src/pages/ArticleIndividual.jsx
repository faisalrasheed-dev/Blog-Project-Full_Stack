import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import { AddComment } from '../components/AddComment'; 
import { CommentsList } from '../components/CommentsList'; 
import { useUser } from '../UserContext.jsx';
import DOMPurify from 'dompurify';

const API_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_URL_LOCAL 
  : import.meta.env.VITE_API_URL;

const ArticleIndividual = () => {
  const { comments: initialComments, upvotes: initialUpvotes, articleName, content, upvoteIds } = useLoaderData();
  const safeContent = DOMPurify.sanitize(content);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);
  const { id } = useParams();
  const { isLoading, user } = useUser();
  const navigate = useNavigate();
  const [upvotedUser, setUpvotedUser] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user && !isLoading) return navigate('/login');
    if (user) setUpvotedUser(upvoteIds.includes(user.uid));
  }, [user, isLoading, navigate]);

  async function upvoteUpdate() {
    setLoading(true);
    const token = user && await user.getIdToken();
    if (!token) return navigate('/login');

    const alreadyUpvoted = upvotedUser;
    setUpvotes(prev => alreadyUpvoted ? prev - 1 : prev + 1);
    setUpvotedUser(prev => !prev);

    try {
      const headers = { authtoken: token };
      const response = await axios.post(`${API_URL}/api/articles/${id}/upvotes`, null, { headers });
      setUpvotes(response.data.upvotes);
      setUpvotedUser(response.data.upvoteIds.includes(user.uid));
    } catch (e) {
      setUpvotes(prev => alreadyUpvoted ? prev + 1 : prev - 1);
      setUpvotedUser(prev => alreadyUpvoted);
    } finally {
      setLoading(false);
    }
  }

  async function onAddComment({ commentText }) {
    const token = user && await user.getIdToken();
    if (!token) return navigate('/login');

    const headers = { authtoken: token };
    const response = await axios.post(`${API_URL}/api/articles/${id}/comments`, { text: commentText }, { headers });
    setComments(response.data.comments);
  }

  return (
    <div className="space-y-10">

      <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
        {articleName}
      </h1>

 
      {user && (
        <div className="flex justify-center">
          <button
            onClick={upvoteUpdate}
            className={`px-6 py-2 rounded-lg font-semibold border-2 transition-colors duration-300 ${
              upvotedUser 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-400 hover:bg-blue-500 hover:text-white'
            }`}
            disabled={loading}
          >
            {loading ? "Upvoting..." : "Upvote"}
          </button>
        </div>
      )}

      <h2 className="text-center text-lg md:text-xl font-medium text-gray-700">
        This article has {upvotes} upvotes
      </h2>

      <div
        className="prose prose-sm md:prose-md max-w-3xl mx-auto text-gray-800 leading-relaxed space-y-4 text-justify bg-white p-6 rounded-lg shadow"
        dangerouslySetInnerHTML={{ __html: safeContent }}
      />

      {user && (
        <>
      
          <h2 className="text-2xl md:text-3xl mt-10 mb-4 font-semibold text-gray-800 text-center">
            Add Your Comment
          </h2>
          <AddComment onAddComment={onAddComment} />
        </>
      )}

      
      <div className="mt-10">
        <h2 className="text-2xl md:text-3xl mb-6 font-semibold text-gray-800 text-center">
          Comments
        </h2>
        <CommentsList comments={comments} />
      </div>
    </div>
  );
};

export async function loader({ params }) {
  const response = await axios.get(`${API_URL}/api/articles/${params.id}`);
  const { comments, upvotes, articleName, content, upvoteIds } = response.data;
  return { comments, upvotes, articleName, content, upvoteIds };
}

export default ArticleIndividual;
