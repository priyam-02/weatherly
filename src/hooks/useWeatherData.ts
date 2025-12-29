import { useState, useCallback } from "react";
import { WEATHER_API_URL } from "../api";
import { CurrentWeatherState, ForecastState, WeatherData, ForecastData } from "../types/weather.types";
import { CityOption } from "../types/location.types";

/**
 * Custom hook for managing weather data fetching and state
 *
 * @returns {Object} Weather data state and handlers
 * @property {CurrentWeatherState | null} currentWeather - Current weather data
 * @property {ForecastState | null} forecast - 7-day forecast data
 * @property {boolean} isLoading - Loading state indicator
 * @property {string | null} error - Error message if fetch fails
 * @property {string | null} currentLocationValue - Current location coordinates
 * @property {Function} fetchWeather - Function to fetch weather for a location
 * @property {Function} clearWeather - Function to reset weather state
 */
export const useWeatherData = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherState | null>(null);
  const [forecast, setForecast] = useState<ForecastState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLocationValue, setCurrentLocationValue] = useState<string | null>(null);

  /**
   * Fetches current weather and 7-day forecast for a location
   *
   * @param {CityOption} searchData - Location data with coordinates and city name
   */
  const fetchWeather = useCallback(async (searchData: CityOption) => {
    const [lat, lon] = searchData.value.split(" ");
    setCurrentLocationValue(searchData.value);
    setIsLoading(true);
    setError(null);

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&type=current`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&type=forecast`
    );

    try {
      const responses = await Promise.all([currentWeatherFetch, forecastFetch]);

      if (!responses[0].ok || !responses[1].ok) {
        throw new Error("Failed to fetch weather data. Please try again.");
      }

      const weatherResponse: WeatherData = await responses[0].json();
      const forecastResponse: ForecastData = await responses[1].json();

      setCurrentWeather({ city: searchData.label, data: weatherResponse });
      setForecast({ city: searchData.label, data: forecastResponse });
      setIsLoading(false);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load weather data. Please check your connection and try again."
      );
      setIsLoading(false);
    }
  }, []);

  /**
   * Clears all weather data and resets to initial state
   */
  const clearWeather = useCallback(() => {
    setError(null);
    setCurrentWeather(null);
    setForecast(null);
    setCurrentLocationValue(null);
  }, []);

  return {
    currentWeather,
    forecast,
    isLoading,
    error,
    currentLocationValue,
    fetchWeather,
    clearWeather,
  };
};
