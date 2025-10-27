import { Link, useLoaderData } from "react-router-dom"
import axios from "axios"
import { ArticleCard } from "./ArticleCard";
const API_URL=import.meta.env.MODE==="development"?
import.meta.env.VITE_API_URL_LOCAL:import.meta.env.VITE_API_URL
const ArticlesSeparate = () => {
  const{articles,page,totalPages} =useLoaderData() || {};
  if (!articles || articles.length === 0) {
  return <p>No articles found</p>;
}

  if (!articles.length) return <p>No articles found</p>
  return (
    <main className=" font-sans bg-gray-100">
      <h1 className="text-center text-xl md:text-4xl font-bold mb-6">List of Articles</h1>
      <ArticleCard articles={articles} />
      <div className='text-center mt-10 space-x-2'>
        {page>1&&<Link  className='px-4 py-2 bg-gray-500 text-white hover:bg-black' to={`?page=${page-1}`}>Previous</Link>}
        {page<totalPages&&<Link  className='px-4 py-2  bg-gray-500 text-white hover:bg-black ' to={`?page=${page+1}`}>Next</Link>}
      </div>
    
    </main>
  )
}
export async function loader({ request }) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 5; 

  const response = await axios.get(`${API_URL}/api/articles?page=${page}&limit=${limit}`);
  return {
    articles: response.data.articles,
    page,
    totalPages: response.data.totalPages
  };
}
export default ArticlesSeparate