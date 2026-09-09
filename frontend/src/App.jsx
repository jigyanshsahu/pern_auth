import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./components/Notfound";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

axios.defaults.withCredentials = true;

const App = () => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me");
        setuser(res.data);
      } catch (err) {
        setuser(null);
      } finally {
        setloading(false);
      }
    };
    fetchuser();
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading application...</div>;
  }

  return (
    <Router>
      <Navbar user={user} setuser={setuser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login setuser={setuser} />
          }
        />
        <Route
          path="/register"
          element={
            user ? <Navigate to="/" replace /> : <Register setuser={setuser} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
