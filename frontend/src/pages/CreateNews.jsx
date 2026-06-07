import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function CreateNews() {
const navigate = useNavigate();

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [content, setContent] = useState("");
const [image, setImage] = useState(null);

const [uploading, setUploading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();


try {
  setUploading(true);

  let imageUrl = "";

  if (image) {
    const formData = new FormData();

    formData.append("image", image);

    const uploadRes = await API.post(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    imageUrl = uploadRes.data.imageUrl;
  }

  const token = localStorage.getItem("token");

  await API.post(
    "/news/custom",
    {
      title,
      description,
      content,
      image: imageUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("News Created Successfully");

  navigate("/dashboard");

} catch (error) {
  console.log(error);
  alert("Failed");
} finally {
  setUploading(false);
}


};

return (
<> <Navbar />


  <div className="max-w-3xl mx-auto p-6">

    <h1 className="text-4xl font-bold mb-6">
      Create News
    </h1>

    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow"
    >

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="w-full border p-3 rounded"
        required
      />

      <textarea
        placeholder="Content"
        rows="8"
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(e.target.files[0])
        }
      />

      <button
        type="submit"
        disabled={uploading}
        className="
        bg-blue-600
        text-white
        px-6
        py-3
        rounded-lg
        "
      >
        {uploading
          ? "Uploading..."
          : "Publish News"}
      </button>

    </form>

  </div>
</>


);
}

export default CreateNews;
