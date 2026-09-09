import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setuser }) => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror("");
    setloading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      setuser(res.data.user || res.data);
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed. Please check your credentials.";
      seterror(message);
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-intro">
          <span className="login-kicker">Welcome back</span>
          <h1>Pick up where you left off.</h1>
          <p>Sign in to continue to your account and keep your work moving.</p>
        </div>
        <form className="login-form" onSubmit={handlesubmit}>
          <div className="login-heading">
            <h2>Sign in</h2>
            <p>Enter your details below.</p>
          </div>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setform({ ...form, email: e.target.value })}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setform({ ...form, password: e.target.value })}
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}{" "}
            <span aria-hidden="true">-&gt;</span>
          </button>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
