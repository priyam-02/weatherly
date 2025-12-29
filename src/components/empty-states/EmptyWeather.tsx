import "./EmptyWeather.css";

const EmptyWeather = () => {
  return (
    <div className="empty-weather" role="status">
      <div className="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
        </svg>
      </div>
      <h2 className="empty-title">Discover the Weather</h2>
      <p className="empty-description">
        Search for any city above to view current weather conditions and 7-day forecasts
      </p>
      <div className="empty-suggestions">
        <span className="suggestion-label">Try:</span>
        <div className="suggestion-chips">
          <span className="suggestion-chip">New York</span>
          <span className="suggestion-chip">London</span>
          <span className="suggestion-chip">Tokyo</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyWeather;
