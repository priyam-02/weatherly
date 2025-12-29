/**
 * Application-wide constants and configuration values
 */

/**
 * API endpoint paths
 */
export const API_ENDPOINTS = {
  WEATHER: "/api/weather",
  CITIES: "/api/cities",
} as const;

/**
 * Search configuration
 */
export const SEARCH_CONFIG = {
  /** Debounce delay for city search input (milliseconds) */
  DEBOUNCE_MS: 600,
} as const;

/**
 * Default popular cities shown when search is empty
 */
export const DEFAULT_CITIES = [
  { value: "40.7127281 -74.0060152", label: "New York, US" },
  { value: "51.5074456 -0.1277653", label: "London, GB" },
  { value: "48.8588897 2.3200410217200766", label: "Paris, FR" },
  { value: "35.6828387 139.7594549", label: "Tokyo, JP" },
  { value: "19.0759899 72.8773928", label: "Mumbai, IN" },
  { value: "-33.8698439 151.2082848", label: "Sydney, AU" },
  { value: "52.5170365 13.3888599", label: "Berlin, DE" },
  { value: "41.8933203 12.4829321", label: "Rome, IT" },
] as const;

/**
 * Favorites configuration
 */
export const FAVORITES_CONFIG = {
  /** Maximum number of favorite locations */
  MAX_FAVORITES: 10,
  /** LocalStorage key for favorites */
  STORAGE_KEY: "weatherly_favorites",
} as const;

/**
 * Temperature settings configuration
 */
export const TEMPERATURE_CONFIG = {
  /** LocalStorage key for temperature unit preference */
  STORAGE_KEY: "weatherly_temp_unit",
  /** Default temperature unit */
  DEFAULT_UNIT: "celsius" as const,
} as const;

/**
 * Animation durations (milliseconds)
 */
export const ANIMATION_DURATIONS = {
  /** Standard transition duration */
  TRANSITION: 300,
  /** Card slide-in animation */
  CARD_SLIDE: 800,
  /** Stagger delay between list items */
  STAGGER_DELAY: 50,
} as const;

/**
 * Week days array for forecast display
 */
export const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
