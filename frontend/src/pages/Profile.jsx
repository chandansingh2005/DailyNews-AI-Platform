import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10">

        <div className="max-w-5xl mx-auto px-4">

          <div className="bg-white rounded-2xl shadow-xl p-8">

            <div className="flex flex-col md:flex-row items-center gap-6">

            {
  user?.profilePhoto ? (
    <img
      src={user.profilePhoto}
      alt="profile"
      className="
      h-24
      w-24
      rounded-full
      object-cover
      "
    />
  ) : (
    <div
      className="
      h-24
      w-24
      rounded-full
      bg-gradient-to-r
      from-blue-500
      to-purple-500
      flex
      items-center
      justify-center
      text-white
      text-4xl
      font-bold
      "
    >
      {user?.email?.charAt(0).toUpperCase()}
    </div>
  )
}

              <div>
                <h1 className="text-3xl font-bold">
                  {user?.name || "User"}
                </h1>

                <p className="text-gray-500">
                  {user?.email || "Loading..."}
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              <div className="bg-slate-100 p-6 rounded-xl">
                <h3 className="font-bold mb-2">
                  Email
                </h3>

                <p>
                  {user?.email || "Not Available"}
                </p>
              </div>

              <div className="bg-slate-100 p-6 rounded-xl">
                <h3 className="font-bold mb-2">
                  Username
                </h3>

                <p>
                  {user?.name || "Not Available"}
                </p>
              </div>

              <div className="bg-slate-100 p-6 rounded-xl">
                <h3 className="font-bold mb-2">
                  Account Status
                </h3>

                <p>Active</p>
              </div>

              <div className="bg-slate-100 p-6 rounded-xl">
                <h3 className="font-bold mb-2">
                  DailyNews AI Member
                </h3>

                <p>Verified User</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;