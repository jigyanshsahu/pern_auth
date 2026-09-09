import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <main className="home-page">
      <div className="hero-card">
        {user ? (
          <>
            <h1>Welcome, {user.name}!</h1>
            <p>You are authenticated and logged into the PERN stack application.</p>
            <div className="user-profile-badge">
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to PERN Auth</h1>
            <p>
              A full-stack PostgreSQL, Express, React, and Node.js authentication
              system. Sign in or register an account to get started.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="btn-secondary">
                Sign in
              </Link>
              <Link to="/register" className="btn-primary">
                Sign up
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
