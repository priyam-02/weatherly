import "./WeatherSkeleton.css";

const WeatherSkeleton = () => {
  return (
    <div className="weather-skeleton" role="status" aria-label="Loading weather data">
      <div className="skeleton-top">
        <div className="skeleton-city-info">
          <div className="skeleton-line skeleton-line--title"></div>
          <div className="skeleton-line skeleton-line--subtitle"></div>
        </div>
        <div className="skeleton-icon"></div>
      </div>
      <div className="skeleton-bottom">
        <div className="skeleton-temperature"></div>
        <div className="skeleton-details">
          <div className="skeleton-detail-row skeleton-detail-row--header"></div>
          <div className="skeleton-detail-row"></div>
          <div className="skeleton-detail-row"></div>
          <div className="skeleton-detail-row"></div>
          <div className="skeleton-detail-row"></div>
        </div>
      </div>
      <span className="sr-only">Loading weather information...</span>
    </div>
  );
};

export default WeatherSkeleton;
