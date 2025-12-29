import "./App.css";
import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import LoadingSpinner from "./components/loading/LoadingSpinner";
import WeatherSkeleton from "./components/loading/WeatherSkeleton";
import ErrorMessage from "./components/error/ErrorMessage";
import EmptyWeather from "./components/empty-states/EmptyWeather";
import ErrorBoundary from "./components/error/ErrorBoundary";
import FavoritesList from "./components/favorites/FavoritesList";
import { SettingsProvider } from "./context/SettingsContext";
import { useWeatherData } from "./hooks/useWeatherData";
import { CityOption } from "./types/location.types";

function App() {
  const [showFavorites, setShowFavorites] = useState(false);

  const {
    currentWeather,
    forecast,
    isLoading,
    error,
    currentLocationValue,
    fetchWeather,
    clearWeather,
  } = useWeatherData();

  const handleOnSearchChange = (searchData: CityOption | null) => {
    if (!searchData) return;
    fetchWeather(searchData);
    setShowFavorites(false); // Hide favorites when searching
  };

  const handleRetry = () => {
    clearWeather();
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <SettingsProvider>
      <ErrorBoundary>
        <div className="container">
          <Search
            onSearchChange={handleOnSearchChange}
            onToggleFavorites={toggleFavorites}
            showFavorites={showFavorites}
          />

          {error && <ErrorMessage message={error} onRetry={handleRetry} />}

          {isLoading && !error && (
            <>
              <LoadingSpinner size="large" message="Fetching weather data..." />
              <WeatherSkeleton />
            </>
          )}

          {!isLoading && !error && showFavorites && (
            <FavoritesList
              onSelectFavorite={handleOnSearchChange}
              currentLocation={currentLocationValue || undefined}
            />
          )}

          {!isLoading && !error && !showFavorites && !currentWeather && !forecast && (
            <EmptyWeather />
          )}

          {!isLoading && !error && !showFavorites && currentWeather && (
            <CurrentWeather data={currentWeather} locationValue={currentLocationValue || undefined} />
          )}
          {!isLoading && !error && !showFavorites && forecast && <Forecast data={forecast} />}
        </div>
      </ErrorBoundary>
    </SettingsProvider>
  );
}

export default App;
