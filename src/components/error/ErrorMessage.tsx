import "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  variant?: "inline" | "card";
}

const ErrorMessage = ({
  message,
  onRetry,
  variant = "card"
}: ErrorMessageProps) => {
  return (
    <div
      className={`error-message error-message--${variant}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="error-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>

      <div className="error-content">
        <h3 className="error-title">Oops! Something went wrong</h3>
        <p className="error-description">{message}</p>

        {onRetry && (
          <button
            className="error-retry-button"
            onClick={onRetry}
            aria-label="Retry loading weather data"
          >
            <svg className="retry-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
