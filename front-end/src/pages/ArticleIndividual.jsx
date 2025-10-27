import axios from 'axios';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { redirect, useLoaderData, useParams } from 'react-router-dom';
import { AddComment } from '../components/AddComment';
import { CommentsList } from '../components/CommentsList';
import LoadMoreButton from '../components/LoadMoreButton.jsx';
import { useUser } from '../UserContext.jsx';

const API_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_URL_LOCAL 
  : import.meta.env.VITE_API_URL;

const ArticleIndividual = () => {
  const { comments: initialComments, upvotes: initialUpvotes, articleName, content, upvoteIds,skip,limit,totalComments} = useLoaderData();
  const safeContent = DOMPurify.sanitize(content);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);
  const { id } = useParams();
  const { isLoading, user } = useUser();
  const [upvotedUser, setUpvotedUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skips,setSkips]=useState(skip)
  

  useEffect(() => {
    setUpvotedUser(upvoteIds.includes(user?.uid));
  }, [upvoteIds,user]);

  async function upvoteUpdate() {
    setLoading(true);
    const token = localStorage.getItem('authtoken')
    const alreadyUpvoted = upvotedUser;
    setUpvotes(prev => alreadyUpvoted ? prev - 1 : prev + 1);
    setUpvotedUser(prev => !prev);

    try {
      const headers = { authtoken: token };
      const response = await axios.post(`${API_URL}/api/articles/${id}/upvotes`, null, { headers });
      setUpvotes(response.data.upvotes);
      setUpvotedUser(response.data.upvoteIds.includes(user?.uid));
    } catch (e) {
      setUpvotes(prev => alreadyUpvoted ? prev + 1 : prev - 1);
      setUpvotedUser(prev => alreadyUpvoted);
    } finally {
      setLoading(false);
    }
  }

  async function onAddComment({ commentText }) {
    const token = localStorage.getItem('authtoken')
    const headers = { authtoken: token };
    const response = await axios.post(`${API_URL}/api/articles/${id}/comments`, { text: commentText }, { headers });
    setComments(response.data.comments);
  }
  async function handleLoadComments(){
    try{
      const token=localStorage.getItem('authtoken')
      const headers={authtoken:token}
      const nextSkip = skips + limit
      const response=await axios.get(`${API_URL}/api/articles/${id}?skip=${nextSkip}&limit=${limit}`,{headers})
        setSkips(nextSkip)
        setComments(prev=>[...prev,...response.data.article.comments])
    }catch(e){
      alert('error')
    }
  }

  return (
    <div className="space-y-10">

      <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
        {articleName}
      </h1>

 
      
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
      

      <h2 className="text-center text-lg md:text-xl font-medium text-gray-700">
        This article has {upvotes} upvotes
      </h2>

      <div
        className="prose prose-sm md:prose-md max-w-3xl mx-auto text-gray-800 leading-relaxed space-y-4 text-justify bg-white p-6 rounded-lg shadow"
        dangerouslySetInnerHTML={{ __html: safeContent }}
      />

      
        <>
      
          <h2 className="text-2xl md:text-3xl mt-10 mb-4 font-semibold text-gray-800 text-center">
            Add Your Comment
          </h2>
          <AddComment onAddComment={onAddComment} />
        </>
      

      
      <div className="mt-10">
        <h2 className="text-2xl md:text-3xl mb-6 font-semibold text-gray-800 text-center">
          Comments
        </h2>
        <CommentsList comments={comments} />
      </div>

  <div className="prose prose-sm md:prose-md max-w-3xl mx-auto text-center">
  <LoadMoreButton onClick={handleLoadComments} show={comments.length<totalComments}/>
</div>

    </div>
  );
};

export async function loader({ params }) {
  const token = localStorage.getItem('authtoken')
  if (!token) {
    return redirect('/login')
  }
  const skip=0
  const limit=5
  const headers = { authtoken: token }
  const response = await axios.get(`${API_URL}/api/articles/${params.id}?skip=${skip}&limit=${limit}`,{headers});
  const { comments,upvotes, articleName, content, upvoteIds } = response.data.article;
  const totalComments=response.data.totalComments
  return { comments, upvotes, articleName, content, upvoteIds,totalComments,skip,limit };
}

export default ArticleIndividual;
