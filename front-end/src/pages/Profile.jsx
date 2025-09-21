import axios from 'axios'
import { useState } from 'react'
import { redirect, useLoaderData, useNavigate } from 'react-router-dom'
import LoadMoreButton from '../components/LoadMoreButton'
import { useUser } from '../UserContext'

const API_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL

const Profile = () => {
  const {articles,limit,totalArticles,skip} = useLoaderData()
  const[skips,setSkips]=useState(skip)
  const [article, setArticle] = useState(articles)
  const {user } = useUser()
  const navigate = useNavigate()
  const [newTotalArticles,setNewTotalArticles]=useState(totalArticles)
  const handleDelete = async (id) => {
  const token = localStorage.getItem('authtoken')
    
    try {
      const headers = { authtoken: token }
      await axios.delete(`${API_URL}/api/articles/${id}`, { headers })
      setArticle((prev) => prev.filter((x) => x._id !== id))
      setNewTotalArticles(prev=>prev-1)
    } catch (e) {
      console.log(e)
      alert('Deletion failed')
    }
  }
  const handleLoadMore=async ()=>{
    try{
    const newSkip=skips+limit
    const token=localStorage.getItem("authtoken")
    const headers={authtoken:token}
    const response=await axios.get(`${API_URL}/api/profile?skip=${newSkip}&limit=${limit}`,{headers})
    setSkips(newSkip)
    setArticle(prev=>[...prev,...response.data.articles])
    }
    catch(e){
      alert('ERROR')
    }
    
  }

  return (
    <>
      <div>
        <h2 className="text-center text-2xl md:text-4xl">Profile Page</h2>
        <p className=" text-sm md:text-[1rem] text-end">{user?.email}</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        {article.length > 0 ? (
          <div>
            <p className="text-center text-[0.8rem] md:text-[1rem]">
              Currently You have Uploaded {newTotalArticles} Articles
            </p>
            <h2 className=" text-2xl md:text-3xl text-center">Articles</h2>
            <div className="mt-6 space-y-4">
              {article.map((a) => (
                <div
                  key={a._id}
                  className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-4 rounded"
                >
                  <div className="text-left">
                    <h2 className="text-[0.9rem] md:text-xl font-semibold ">{a.articleName}</h2>
                   <p className="text-[0.8rem] md:text-lg text-gray-600">
  Created at {new Date(a.createdAt).toLocaleDateString('en-GB').replace(/\//g,'-')}
</p>
                  </div>
                  <div className="flex gap-1 md:gap-3 mt-2 md:mt:0">
                    <button
                      className="w-full md:w-auto px-2 py-1 md:px-3 md:py-1 border rounded bg-white hover:text-red-500"
                      onClick={() => handleDelete(a._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="w-full md:w-auto px-2 py-1 md:px-3 md:py-1 border rounded bg-white hover:text-blue-500"
                      onClick={() => navigate(`/edit-article/${a._id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <LoadMoreButton onClick={handleLoadMore} show={article.length<totalArticles}/>
           
          </div>
        ) : (
          <p className='text-[0.8rem]'>You don’t have any articles</p>
        )}
      </div>
    </>
  )
}

export async function loader({request}) {
  const token = localStorage.getItem('authtoken')
  if (!token) {
    return redirect('/login')
  }
  const url=new URL(request.url)
  const limit=5
  const skip=0
  const headers = { authtoken: token }
  const response = await axios.get(`${API_URL}/api/profile?skip=${skip}&limit=${limit}`, { headers })
  const{articles,totalArticles}=response.data
  return {articles,totalArticles,limit,skip}
}

export default Profile
