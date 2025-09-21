
import book1 from "../assets/book1.jpg";
import { Link } from "react-router-dom";


export const ArticleCard = ({ articles }) => {

  return (
    <section className="flex flex-col gap-4 md:gap-6">
      {articles.map((a) => (
        <article
          key={a._id}
          className="flex flex-col md:flex-row gap-4 md:gap-6 bg-white p-2 md:p-4 rounded-lg shadow-sm items-start"
        >
          <img
            src={book1 || "/placeholder.jpg"}
            alt={a.articleName}
            className="w-full md:w-32 md:h-48 object-cover rounded"
          />

          <div className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col md:flex-row justify-between items-center mb-2">
              <Link to={`/articles/${a._id}`}>
                <h2 className="text-[0.9rem] md:text-2xl font-semibold hover:underline ">
                  {a.articleName}
                </h2>
              </Link>
              <h4 className="text-gray-600 text-[0.7rem] md:text-lg">
                Author: {a.author}
              </h4>
            </div>

            <p className="text-gray-700 text-sm md:text-lg mb-2 line-clamp-4 md:line-clamp-5 text-justify">
  {a.content.replace(/<[^>]*>/g, "")}
</p>

              <Link
                to={`/articles/${a._id}`}
                className="text-blue-600 hover:underline"
              >
              Read More.....
              </Link>
              
           
          </div>
        </article>
      ))}
    </section>
  );
};
