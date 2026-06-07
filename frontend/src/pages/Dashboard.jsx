import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [myArticles, setMyArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/news/my-articles",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyArticles(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(
        `/news/custom/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchArticles();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <Link
            to="/create-news"
            className="
            bg-blue-600
            text-white
            px-5
            py-2
            rounded-lg
            "
          >
            Create News
          </Link>

        </div>

        {loading ? (
          <h2>Loading...</h2>
        ) : myArticles.length === 0 ? (
          <h2>No Articles Found</h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {myArticles.map((article) => (
              <div
                key={article._id}
                className="
                bg-white
                rounded-xl
                shadow-md
                overflow-hidden
                "
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

                  <p className="text-gray-600">
                    {article.description}
                  </p>

                  <div className="flex gap-2 mt-4">

                    <Link
                      to={`/edit-news/${article._id}`}
                      className="
                      bg-yellow-500
                      text-white
                      px-4
                      py-2
                      rounded
                      "
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        deleteArticle(article._id)
                      }
                      className="
                      bg-red-500
                      text-white
                      px-4
                      py-2
                      rounded
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </>
  );
}

export default Dashboard;