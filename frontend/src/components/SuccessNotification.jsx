import "./SuccessNotification.css";

function SuccessNotification({ message, onClose }) {
  return (
    <div className="success-notification">
      <div className="success-icon">✓</div>
      <h3>{message}</h3>
      <p>Redirecting back to tasks...</p>
      <button onClick={onClose} className="close-button">
        Close Now
      </button>
    </div>
  );
}

export default SuccessNotification;