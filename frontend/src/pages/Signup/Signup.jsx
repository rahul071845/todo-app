import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signupUser } from "../../api/userApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { setIsAuthenticated } = useAuth();
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    if (!password) return "";
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "medium";
    return "strong";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signupUser(formData);
      setIsAuthenticated(true);
      toast.success("Signed up succesfully");
      navigate("/tasks");
    } catch (err) {
      const msg = err.response?.data?.error || "Signup failed. Please try again."
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-form-title">Create Account</h2>

        <div className="signup-form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
            required
            minLength={3}
          />
        </div>

        <div className="signup-form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="signup-form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
            minLength={6}
          />
          <div
            className="password-strength"
            data-strength={passwordStrength}
            aria-label={`Password strength: ${passwordStrength || "none"}`}
          >
            <div className="strength-meter"></div>
            <span className="strength-text">
              {passwordStrength && `Strength: ${passwordStrength}`}
            </span>
          </div>
        </div>

        <div className="signup-form-group">
          <button type="submit" className="signup-button" disabled={isLoading}>
            "Sign Up"
          </button>
        </div>
        {isLoading && <LoadingSpinner overlay />}

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login" className="login-link-text">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
