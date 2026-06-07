import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateNews from "./pages/CreateNews";
import EditNews from "./pages/EditNews";
import Bookmarks from "./pages/Bookmarks";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import AllArticles from "./pages/AllArticles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>
        }
      />
      <Route  path="/community"  element={<AllArticles />}
/>

      <Route path="/create-news" element={<CreateNews />} />

      <Route path="/edit-news/:id" element={<EditNews />} />

      <Route path="/bookmarks" element={<Bookmarks />} />

      <Route  path="/profile" element={<Profile />}
      
/>
    </Routes>
  );
}

export default App;