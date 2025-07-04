import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../api/userApi";
import { useAuth } from "../context/AuthContext.jsx";
import LoadingSpinner from "./LoadingSpinner";
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError(null);
    try {
      await logoutUser();
      setIsAuthenticated(false);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // While auth is loading, show a spinner or null
  if (isAuthenticated === null) {
    return (
      <div className="navbar-loading">
        <LoadingSpinner small />
      </div>
    );
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
              {isLoggingOut ? (
                <LoadingSpinner small white />
              ) : (
                <>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </>
              )}
            </button>
            {error && <span className="nav-error">{error}</span>}
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
