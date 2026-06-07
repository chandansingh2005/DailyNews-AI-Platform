import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/login", {
      replace: true,
    });

    window.location.reload();
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-400"
        >
          DailyNews AI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>
          <Link to="/community">  Community
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-blue-400 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/create-news"
            className="hover:text-blue-400 transition"
          >
            Create News
          </Link>

          <Link
            to="/bookmarks"
            className="hover:text-blue-400 transition"
          >
            Bookmarks
          </Link>

          {token && (
            <Link
              to="/profile"
              className="hover:text-blue-400 transition"
            >
              Profile
            </Link>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-blue-500 px-4 py-2 rounded-lg"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-500 px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-800 flex flex-col px-6 py-4 gap-4">

          <Link to="/">
            Home
          </Link>

          <Link to="/community">  Community
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/create-news">
            Create News
          </Link>

          <Link to="/bookmarks">
            Bookmarks
          </Link>

          {token && (
            <Link to="/profile">
              Profile
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;