import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setuser }) => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror("");

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      seterror("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      seterror("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      seterror("Passwords do not match.");
      return;
    }

    setloading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (setuser) {
        setuser(res.data.user || res.data);
      }
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. Please try again.";
      seterror(message);
      console.error("Registration error:", err);
    } finally {
      setloading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-intro">
          <span className="login-kicker">Start your journey</span>
          <h1>Create your account today.</h1>
          <p>
            Join now to get full access to your personalized dashboard and secure features.
          </p>
        </div>

        <form className="login-form" onSubmit={handlesubmit}>
          <div className="login-heading">
            <h2>Sign up</h2>
            <p>Enter your details to create an account.</p>
          </div>

          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setform({ ...form, name: e.target.value })}
            required
          />

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
            placeholder="At least 6 characters"
            value={form.password}
            onChange={(e) => setform({ ...form, password: e.target.value })}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={(e) =>
              setform({ ...form, confirmPassword: e.target.value })
            }
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}{" "}
            <span aria-hidden="true">-&gt;</span>
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Register;
