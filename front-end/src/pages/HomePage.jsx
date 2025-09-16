import React from 'react'
import axios from 'axios'
import book from '../assets/book.jpg'
import { Link, useLoaderData } from 'react-router-dom'
import { ArticleCard } from '../components/ArticleCard'

const API_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL

const HomePage = () => {
  const articles = useLoaderData()
 

  return (
    <>
      {articles && articles.length >= 10 ? (
        <>
          <h1 className="text-center  text-xl md:text-4xl font-bold mb-6">Top Trending Articles</h1>
          <ArticleCard articles={articles} />
          
        </>
      ) : (
        <section>
          <p>
            This blog is a space where I share thoughts, tutorials, and stories about things that
            truly interest me. Whether it's technology, personal growth, or random insights — this
            is the place where ideas come alive.
          </p>
        </section>
      )}
    </>
  )
}
export async function loader() {
  const response = await axios.get(`${API_URL}/api/articles/top-articles`)
  return response.data
}

export default HomePage
