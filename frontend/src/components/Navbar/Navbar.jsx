import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../../api/userApi.js";
import { useAuth } from "../../context/AuthContext.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Logout failed";
      toast.error(msg);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isAuthenticated === null) {
    return <LoadingSpinner overlay />;
  }

  return (
    <nav className="navbar-container">
      <div className="nav-brand">
        <i className="fas fa-tasks"></i> Task Manager
      </div>

      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <NavLink to="/tasks" end className="nav-link">
              <i className="fas fa-tasks"></i> All Tasks
            </NavLink>
            <NavLink to="/add" end className="nav-link">
              <i className="fas fa-plus"></i> Add Task
            </NavLink>
            <button
              onClick={handleLogout}
              className="nav-button"
              disabled={isLoggingOut}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
            {isLoggingOut && <LoadingSpinner overlay />}
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">
              <i className="fas fa-sign-in-alt"></i> Login
            </NavLink>
            <NavLink to="/signup" className="nav-link">
              <i className="fas fa-user-plus"></i> Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
