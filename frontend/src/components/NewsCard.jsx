import { useState } from "react";
import API from "../api/axios";

function NewsCard({ article }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummary = async () => {
    try {
      setLoading(true);

      const res = await API.post("/ai/summarize", {
        text:
          article.description ||
          article.content ||
          article.title,
      });

      setSummary(res.data.summary);
    } catch (error) {
      console.log(error);
      alert("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await API.post(
        "/bookmarks",
        {
          title: article.title,
          description: article.description,
          image:
            article.urlToImage || article.image,
          url: article.url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Bookmark Saved");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
      bg-white
      rounded-2xl
      overflow-hidden
      shadow-md
      border
      border-gray-100
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      "
    >
      <img
        src={
          article.urlToImage ||
          article.image ||
          "https://via.placeholder.com/600x400"
        }
        alt="news"
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <h2 className="font-bold text-xl mb-3 line-clamp-2">
          {article.title}
        </h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>

        <div className="flex flex-wrap gap-2">

          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-4
              py-2
              rounded-lg
              "
            >
              Read More
            </a>
          )}

          <button
            onClick={handleSummary}
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-4
            py-2
            rounded-lg
            "
          >
            AI Summary
          </button>
          <button
            onClick={handleBookmark}
            className="
  bg-yellow-500
  text-white
  px-4
  py-2
  rounded-lg
  hover:bg-yellow-600
  "
          >
            Bookmark
          </button>

        </div>

        {loading && (
          <p className="mt-4 text-blue-500 font-medium">
            Generating Summary...
          </p>
        )}


        {summary && (
          <div className="mt-4 bg-slate-100 p-4 rounded-xl border">
            <h3 className="font-bold text-blue-600 mb-2">
              AI Summary
            </h3>

            <p className="text-gray-700 leading-7">
              {summary}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default NewsCard;