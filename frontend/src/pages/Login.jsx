import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/userApi";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await loginUser(formData);
      setIsAuthenticated(true);
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-form-title">Login</h2>

        {error && (
          <ErrorMessage
            message={error}
            dismissable
            onDismiss={() => setError("")}
          />
        )}

        <div className="login-form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="login-form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="login-form-group">
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <LoadingSpinner small /> : "Login"}
          </button>
        </div>

        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link-text">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
