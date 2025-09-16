import axios from 'axios'
import { useState } from 'react'
import { redirect, useLoaderData, useNavigate } from 'react-router-dom'
import { useUser } from '../UserContext'

const API_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL

const Profile = () => {
  const { response: articles } = useLoaderData()
  const [article, setArticle] = useState(articles)
  const { isLoading, user } = useUser()
  const navigate = useNavigate()

  if (isLoading) return <div>Loading...</div>

  const handleDelete = async (id) => {
    const token = localStorage.getItem('authtoken')
    if (!token) return navigate('/login')
    try {
      const headers = { authtoken: token }
      await axios.delete(`${API_URL}/api/articles/${id}`, { headers })
      setArticle((prev) => prev.filter((article) => article._id !== id))
    } catch (e) {
      console.log(e)
      alert('Deletion failed')
    }
  }

  return (
    <>
      <div>
        <h2 className="text-center text-2xl md:text-4xl">Profile Page</h2>
        <p className=" text-sm md:text-[1rem] text-end">{user.email}</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        {article.length > 0 ? (
          <div>
            <p className="text-center text-[0.8rem] md:text-[1rem]">
              Currently You have Uploaded {article.length} Articles
            </p>
            <h2 className=" text-2xl md:text-3xl text-center">Articles</h2>
            <div className="mt-6 space-y-4">
              {article.map((a) => (
                <div
                  key={a._id}
                  className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-4 rounded"
                >
                  <div className="text-left">
                    <h2 className="md:text-xl font-semibold">{a.articleName}</h2>
                   <p className="text-sm text-gray-600">
  Created at {new Date(a.createdAt).toLocaleDateString('en-GB').replace(/\//g,'-')}
</p>
                  </div>
                  <div className="flex gap-1 md:gap-3">
                    <button
                      className="w-full md:w-auto px-3 py-1 border rounded bg-white hover:text-red-500"
                      onClick={() => handleDelete(a._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="w-full md:w-auto px-3 py-1 border rounded bg-white hover:text-blue-500"
                      onClick={() => navigate(`/edit-article/${a._id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>You don’t have any articles</p>
        )}
      </div>
    </>
  )
}

export async function loader() {
  const token = localStorage.getItem('authtoken')
  if (!token) {
    return redirect('/login')
  }
  const headers = { authtoken: token }
  const response = await axios.get(`${API_URL}/api/profile`, { headers })
  return response.data
}

export default Profile
