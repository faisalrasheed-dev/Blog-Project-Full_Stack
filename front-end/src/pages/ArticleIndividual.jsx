import axios from 'axios';
import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import articles from '../article-content';
import { AddComment } from '../components/AddComment'; 
import { CommentsList } from '../components/CommentsList'; 
import {useUser} from '../UserContext.jsx'

const ArticleIndividual = () => {
  const { comments: initialComments, upvotes: initialUpvotes } = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);
  const { name } = useParams();
  const article = articles.find((a) => a.name === name);
  const {isLoading,user}=useUser()

  if (!article) {
    return <h2>Article Not Found</h2>;
  }

async function upvoteUpdate(){
    const token=user&& await user.getIdToken()
    if(!token)
    {
      alert("You must be logged in to Upvote");
      return
    }
    const headers={authtoken:token}
    const response = await axios.post('/api/articles/' + name + '/upvotes',null,{headers});
    const articleUpvote = response.data; 
    console.log("Upvote API Response:", articleUpvote); 
    setUpvotes(articleUpvote.upvotes);
}

async function onAddComment({commentText}){
  const token=user&& await user.getIdToken()
  if(!token)
  {
    alert("You must be logged in to comment");
    return
  }
  const headers={authtoken:token}
    const response = await axios.post('/api/articles/' + name + '/comments', {text: commentText},{headers});
    const articleComments = response.data; 
    console.log("Comment API Response:", articleComments); 
    setComments(articleComments.comments);
}
  return (
    <div>
      <h1>{article.title}</h1>
      {user&&<button onClick={upvoteUpdate}>Upvote</button>}
      <h5>This article has {upvotes} upvotes</h5>
      <h3>{article.name}</h3>
      {article.contents.map((p, i) => (<p key={i}>{p}</p>))}
      {user&&<AddComment onAddComment={onAddComment} />}
      <h2>Comments</h2>
      <CommentsList comments={comments} />
    </div>
  );
};

export async function loader({ params }) {
  const response = await axios.get('/api/articles/' + params.name);
  const { comments, upvotes } = response.data;
  return { comments, upvotes };
}

export default ArticleIndividual;