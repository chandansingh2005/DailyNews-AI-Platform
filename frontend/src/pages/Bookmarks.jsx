import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/bookmarks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookmarks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBookmark = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(
        `/bookmarks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookmarks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">
          My Bookmarks
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="font-bold">
                  {item.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {item.description}
                </p>

                <div className="flex gap-2 mt-4">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Read
                  </a>

                  <button
                    onClick={() =>
                      deleteBookmark(item._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default Bookmarks;