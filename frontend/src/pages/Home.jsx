import { useEffect, useState } from "react";
import API from "../api/axios";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CategoryBar from "../components/CategoryBar";
import NewsCard from "../components/NewsCard";

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  // Top Headlines
  const fetchTopHeadlines = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/news/top-headlines?page=${page}`
      );

      setNews(res.data.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Search
  const handleSearch = async (query) => {
    try {
      setLoading(true);

      const res = await API.get(
        `/news/search?q=${query}`
      );

      setNews(res.data.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Category
  const handleCategory = async (category) => {
    try {
      setLoading(true);

      const res = await API.get(
        `/news/category/${category}`
      );

      setNews(res.data.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopHeadlines();
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-4">

        <h1 className="text-4xl font-bold mb-6">
          DailyNews AI
        </h1>

        <SearchBar onSearch={handleSearch} />

        <CategoryBar onCategory={handleCategory} />

        {loading ? (
          <div className="text-center py-20">
            Loading...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {news.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
              />
            ))}

          </div>
        )}

        <div className="flex justify-center gap-4 mt-10">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-gray-700 text-white px-5 py-2 rounded"
          >
            Previous
          </button>

          <span className="font-bold text-lg">
            Page {page}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            className="bg-blue-500 text-white px-5 py-2 rounded"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default Home;