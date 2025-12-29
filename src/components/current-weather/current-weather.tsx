import { CurrentWeatherState } from "../../types/weather.types";
import { useSettings } from "../../context/SettingsContext";
import { formatTemperature } from "../../utils/temperature";
import { useFavorites } from "../../hooks/useFavorites";
import "./current-weather.css";

interface CurrentWeatherProps {
  data: CurrentWeatherState | null;
  locationValue?: string;
}

const CurrentWeather = ({ data, locationValue }: CurrentWeatherProps) => {
  const { temperatureUnit } = useSettings();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!data || !data.data || !data.data.weather || !data.data.weather[0] || !data.data.main || !data.data.wind) {
    return null;
  }

  const weatherData = data.data;
  const isCurrentlyFavorite = locationValue ? isFavorite(locationValue) : false;

  const handleToggleFavorite = () => {
    if (locationValue) {
      toggleFavorite({ label: data.city, value: locationValue });
    }
  };

  return (
    <div className="weather">
      <div className="top">
        <div>
          <div className="city-header">
            <p className="city">{data.city}</p>
            {locationValue && (
              <button
                className={`favorite-button ${isCurrentlyFavorite ? 'active' : ''}`}
                onClick={handleToggleFavorite}
                aria-label={isCurrentlyFavorite ? 'Remove from favorites' : 'Add to favorites'}
                title={isCurrentlyFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg viewBox="0 0 24 24" fill={isCurrentlyFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            )}
          </div>
          <p className="weather-description">{weatherData.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${weatherData.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{formatTemperature(weatherData.main.temp, temperatureUnit)}</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">
              Details
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{formatTemperature(weatherData.main.feels_like, temperatureUnit)}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{weatherData.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{weatherData.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{weatherData.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
