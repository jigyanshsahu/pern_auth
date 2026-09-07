import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
axios.defaults.withCredentials = true;
const App = () => {
  const [user, setuser] = useState(null);
  const [error, seterror] = useState("");
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
if(loading){
  return <div>loading...</div>
}
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
