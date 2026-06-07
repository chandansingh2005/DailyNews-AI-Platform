import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function AllArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await API.get("/news/all-articles");
      setArticles(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">
          Community News
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {articles.map((article) => (
            <div
              key={article._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">

                <h2 className="font-bold text-xl mb-2">
                  {article.title}
                </h2>

                <p className="text-gray-600 mb-3">
                  {article.description}
                </p>

                <div className="text-sm text-gray-500">
                  By {article.author}
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default AllArticles;