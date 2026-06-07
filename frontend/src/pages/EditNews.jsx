import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function EditNews() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
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

      const article = res.data.data.find(
        (item) => item._id === id
      );

      if (article) {
        setFormData(article);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/news/custom/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Article Updated");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Edit Article
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            rows="8"
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Update Article
          </button>
        </form>

      </div>
    </>
  );
}

export default EditNews;