import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);
  
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const res = await API.get(
        "/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <div className="flex items-center gap-5">

            <div
              className="
              h-20
              w-20
              rounded-full
              bg-blue-500
              text-white
              flex
              items-center
              justify-center
              text-3xl
              font-bold
              "
            >
              {user.name?.charAt(0)}
            </div>


            <div>
              <h1 className="text-3xl font-bold">
                {user.username}
              </h1>

              <p>{user.email}</p>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;