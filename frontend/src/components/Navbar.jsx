import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ user, setuser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      setuser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span>PERN Auth</span>
      </Link>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        {user ? (
          <>
            <span className="nav-user-badge">Hello, {user.name || user.email}</span>
            <button onClick={handleLogout} className="nav-link nav-link-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Sign in
            </Link>
            <Link to="/register" className="nav-link nav-link-btn">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
