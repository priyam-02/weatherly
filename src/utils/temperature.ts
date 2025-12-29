import { TemperatureUnit } from "../types/weather.types";

/**
 * Convert Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

/**
 * Convert Fahrenheit to Celsius
 */
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

/**
 * Format temperature based on unit preference
 */
export const formatTemperature = (
  tempCelsius: number,
  unit: TemperatureUnit,
  decimals: number = 0
): string => {
  if (unit === "fahrenheit") {
    const fahrenheit = celsiusToFahrenheit(tempCelsius);
    return `${fahrenheit.toFixed(decimals)}°F`;
  }
  return `${tempCelsius.toFixed(decimals)}°C`;
};

/**
 * Get temperature value based on unit preference
 */
export const getTemperatureValue = (
  tempCelsius: number,
  unit: TemperatureUnit
): number => {
  return unit === "fahrenheit" ? celsiusToFahrenheit(tempCelsius) : tempCelsius;
};
