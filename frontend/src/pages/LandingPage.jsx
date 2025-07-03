import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LandingPage.css";

function LandingPage() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <div className="landing-container">
      <h1>No more messy schedules</h1>
      <p>Give yourself an ease of mind by managing your days more effectively and being more productive</p>
      <div className="buttons">
        <Link to="/login" className="linkBtn">Login</Link>
        <Link to="/signup" className="linkBtn">Sign Up</Link>
      </div>
    </div>
  );
}

export default LandingPage;
