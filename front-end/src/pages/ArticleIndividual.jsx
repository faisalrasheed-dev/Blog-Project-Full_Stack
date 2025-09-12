import axios from 'axios';
import { useState,useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { AddComment } from '../components/AddComment'; 
import { CommentsList } from '../components/CommentsList'; 
import {useUser} from '../UserContext.jsx'
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_URL_LOCAL 
  : import.meta.env.VITE_API_URL 
const ArticleIndividual = () => {
  const { comments: initialComments, upvotes: initialUpvotes,articleName,content,upvoteIds } = useLoaderData();
  const safeContent = DOMPurify.sanitize(content);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);
  const { id } = useParams();
  const {isLoading,user}=useUser()
  const navigate=useNavigate()
  const [upvotedUser,setUpvotedUser]=useState(false)
  const[loading,setLoading]=useState()
 useEffect(() => {
  if (!user && !isLoading) {
    return navigate('/login');
  }
  if(user){
     setUpvotedUser(upvoteIds.includes(user.uid));
  }
}, [user, isLoading, navigate]);
async function upvoteUpdate(){
  setLoading(true)
    const token=user&& await user.getIdToken()
    if(!token)
    {
      return navigate('/login');
    }
    const alreadyUpvoted=upvotedUser
    setUpvotes(prev=>alreadyUpvoted?prev-1:prev+1)
    setUpvotedUser(prev=>!prev)
    try{
      const headers={authtoken:token}
      const response = await axios.post(`${API_URL}/api/articles/${id}/upvotes`,null,{headers});
      setUpvotes(response.data.upvotes);
      setUpvotedUser(response.data.upvoteIds.includes(user.uid))
    }
    catch(e){
      setUpvotes(prev=>alreadyUpvoted?prev+1:prev-1);
      setUpvotedUser(prev=>alreadyUpvoted)
    }
    finally{
      setLoading(false)
    }
}

async function onAddComment({commentText}){
  const token=user&& await user.getIdToken()
  if(!token)
  {
    return navigate('/login')
  }
  const headers={authtoken:token}
    const response = await axios.post(`${API_URL}/api/articles/${id}/comments`, {text: commentText},{headers});
    const articleComments = response.data; 
    console.log("Comment API Response:", articleComments); 
    setComments(articleComments.comments);
}
  return (
    <div>
      <h1>{articleName}</h1>
      {user && (
  <button onClick={upvoteUpdate} disabled={loading}>
    {loading ? "Upvoting..." : "Upvote"}
  </button>
)}
      <h2>This article has {upvotes} upvotes</h2>
      <div dangerouslySetInnerHTML={{ __html: safeContent }} />
      {user&&<AddComment onAddComment={onAddComment} />}
      <h2>Comments</h2>
      <CommentsList comments={comments} />
    </div>
  );
};

export async function loader({ params }) {
  const response = await axios.get(`${API_URL}/api/articles/${params.id}`);
  const { comments, upvotes,articleName,content,upvoteIds } = response.data;
  return { comments, upvotes,articleName,content,upvoteIds };
}

export default ArticleIndividual;