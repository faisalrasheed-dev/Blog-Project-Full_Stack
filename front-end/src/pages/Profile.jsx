import axios from 'axios'
import { useState } from 'react'
import { redirect, useLoaderData, useNavigate } from 'react-router-dom'
import { useUser } from '../UserContext'
const API_URL=import.meta.env.MODE==="development"?import.meta.env.VITE_API_URL_LOCAL:import.meta.env.VITE_API_URL

const  Profile= () => {
  const {response:articles,count}=useLoaderData()
  const[article,setArticle]=useState(articles)
  const {isLoading,user}=useUser()
  const navigate=useNavigate()
  if (isLoading) return <div>Loading...</div>;
  const handleDelete=async (id)=>{
    const token=localStorage.getItem("authtoken")
    if(!token)return navigate('/login')
    try{
   const headers={authtoken:token}
    const response= await axios.delete(`${API_URL}/api/articles/${id}`,{headers})
    setArticle(prev=>prev.filter(article=>article._id!==id))
  }
   catch(e){
    console.log(e)
    alert("deletion failed")
   }
  }
  const handleEdit=async(id)=>{
    const token=localStorage.getItem("authtoken")
    if(!token)return navigate('/login')
    try{
      const headers={authtoken:token}
      const response=await axios.put(`${API_URL}/api/articles/edit-article/${id}`,{title,content},{headers})
      navigate(`/articles/${id}`)
  }catch(e)
  {
    console.log(e)
  }

  }
  return (
    <div>
      <h2 >Profile</h2>
      <p> this is Profile Page and {user.email} is Logged</p>
      <div>
        {article.length>0?(
        <div>
          <p>You have Uploaded {article.length} Articles</p>
          {article.map((a,i)=>(
          <div key={i}> 
            <p>{a.articleName} created at {new Date(a.createdAt).toLocaleString()}
            </p>
            <button onClick={()=>handleDelete(a._id)}>Delete</button> 
              <button onClick={()=>navigate(`/edit-article/${a._id}`)}>Edit</button>

            
        </div>
      ))}</div>):(
        <p>You dont have any articles</p>
      )}
      </div>
    </div>
)
}
export async function loader (){
    const token = localStorage.getItem("authtoken");
    if(!token){
        
        return redirect("/login");

    }
    const headers={authtoken:token}
    const response=await axios.get(`${API_URL}/api/profile`,{headers})
    return response.data
}
export default  Profile

