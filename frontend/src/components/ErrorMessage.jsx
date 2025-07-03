import './ErrorMessage.css';

function ErrorMessage({ message, onRetry, dismissable = false, onDismiss }) {
  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <span className="error-text">{message}</span>
      </div>
      <div className="error-actions">
        {onRetry && (
          <button className="error-retry-btn" onClick={onRetry}>
            Try Again
          </button>
        )}
        {dismissable && (
          <button className="error-dismiss-btn" onClick={onDismiss}>
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;