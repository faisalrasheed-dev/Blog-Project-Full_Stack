import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import './HomePage.css'
const API_URL = import.meta.env.MODE === 'development'
  ? import.meta.env.VITE_API_URL_LOCAL 
  : import.meta.env.VITE_API_URL 

const HomePage = () => {
  const articles = useLoaderData()

  return (
    <div>
      {articles && articles.length >=10 ? (
        <>
          <h1>Top Trending Articles</h1>
          {articles.map((a, key) => (
            <div key={a._id}>
              <Link to={`/articles/${a._id}`}>
                <h2>{a.articleName}</h2>
                <h4>{a.author}</h4>
              </Link>
              
            </div>
          ))}
        </>
      ) : (
        <>
          <p>
            This blog is a space where I share thoughts, tutorials, and stories about things that
            truly interest me. Whether it's technology, personal growth, or random insights — this is
            the place where ideas come alive.
          </p>
          <p>
            📰 You’ll find hand-picked articles ranging from programming tutorials, life hacks, travel
            reflections, productivity tips, and a lot more. My goal is to create helpful content for
            both beginners and experienced people in various fields.
          </p>
          <p>
            🌱 I'm a learner just like you. Every article here is written based on my experience or
            intense research. I believe that writing is a great way to reinforce what we learn, and
            sharing makes the knowledge more valuable.
          </p>
          <p>
            🧠 Most articles here are short and crisp. Some are deep dives into topics like React,
            JavaScript, or general web development. Others might simply talk about daily life, goals,
            or lessons learned through failures.
          </p>
          <p>
            👉 Feel free to check out the <strong>Articles</strong> section to start reading. If you're
            new, you can head over to the <strong>About</strong> page to know more about why this blog
            exists and what to expect.
          </p>
          <p>
            Thank you for stopping by. This blog is constantly growing, and I’d love to have you as
            part of the journey. Your feedback is always welcome.
          </p>
          <p>— Written with ❤️ and curiosity.</p>
        </>
      )}
    </div>
  )
}

export async function loader() {
  const response = await axios.get(`${API_URL}/api/articles/top-articles`)
  return response.data
}

export default HomePage
