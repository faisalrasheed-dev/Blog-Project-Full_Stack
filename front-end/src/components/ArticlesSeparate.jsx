import { useLoaderData } from "react-router-dom"
import axios from "axios"
import { ArticleCard } from "./ArticleCard";
const API_URL=import.meta.env.MODE==="development"?
import.meta.env.VITE_API_URL_LOCAL:import.meta.env.VITE_API_URL
const ArticlesSeparate = () => {
  const articles=useLoaderData() || [];

  if (!articles.length) return <p>No articles found</p>
  return (
    <main className=" font-sans bg-gray-100">
      <h1 className="text-center text-xl md:text-4xl font-bold mb-6">List of Articles</h1>
      <ArticleCard articles={articles} />
    </main>
  )
}
export  async function loader (){
  const response =await axios.get(`${API_URL}/api/articles`)
  return response.data
}
export default ArticlesSeparate