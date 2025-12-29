import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  message?: string;
}

const LoadingSpinner = ({ size = "medium", message }: LoadingSpinnerProps) => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className={`spinner spinner--${size}`}>
        <div className="spinner__ring"></div>
        <div className="spinner__ring"></div>
        <div className="spinner__ring"></div>
        <div className="spinner__core"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
      <span className="sr-only">Loading weather data...</span>
    </div>
  );
};

export default LoadingSpinner;
