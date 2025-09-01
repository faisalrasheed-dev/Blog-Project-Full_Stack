import { Link } from "react-router-dom"
import articles from '../article-content'
const ArticlesSeparate = () => {
  return (
    <div>
        {articles.map((a, index) => (
        <div key={index}>
          <Link to={`/articles/${a.name}`}>
            <h2>{a.title}</h2>
            <h3>{a.name}</h3>
            <p>{a.contents[0].substring(0,150)}......</p>

          </Link>
          
        </div>
      ))}
    </div>
  )
}

export default ArticlesSeparate