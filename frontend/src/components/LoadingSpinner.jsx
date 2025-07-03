import "./LoadingSpinner.css";

function LoadingSpinner({ overlay = false }) {
  return (
    <div className={`loading-spinner ${overlay ? "overlay" : ""}`}>
      <div className="spinner"></div>
    </div>
  );
}

export default LoadingSpinner;