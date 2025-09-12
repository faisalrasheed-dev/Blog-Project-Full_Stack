import { Link,useLoaderData } from "react-router-dom"
import axios from "axios"
const API_URL=import.meta.env.MODE==="development"?
import.meta.env.VITE_API_URL_LOCAL:import.meta.env.VITE_API_URL
const ArticlesSeparate = () => {
  const articles=useLoaderData() || [];

  if (!articles.length) return <p>No articles found</p>
  return (
    <div>
        {articles.map((a, index) => (
        <div key={index}>
          <Link to={`/articles/${a._id}`}>
          {console.log(a._id)}
            <h2>{a.articleName}</h2>
            <p>{a.content ? a.content.replace(/<[^>]+>/g, "").slice(0, 150) + "..." : "No preview available"}</p>
          </Link>
          
        </div>
      ))}
    </div>
  )
}
export  async function loader (){
  const response =await axios.get(`${API_URL}/api/articles`)
  return response.data
}
export default ArticlesSeparate