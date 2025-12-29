/**
 * Environment-specific configuration
 *
 * This file centralizes environment variables and runtime configuration.
 * In production, these should be set via environment variables.
 */

/**
 * Check if running in development mode
 */
export const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Check if running in production mode
 */
export const isProduction = process.env.NODE_ENV === "production";

/**
 * Check if running in test mode
 */
export const isTest = process.env.NODE_ENV === "test";

/**
 * Application version (from package.json if available)
 */
export const APP_VERSION = process.env.REACT_APP_VERSION || "1.0.0";

/**
 * Enable debug logging
 */
export const DEBUG_ENABLED = isDevelopment || process.env.REACT_APP_DEBUG === "true";

/**
 * API configuration
 */
export const API_CONFIG = {
  /** Base URL for API endpoints (for production deployment) */
  baseUrl: process.env.REACT_APP_API_BASE_URL || "",
  /** Request timeout in milliseconds */
  timeout: 30000,
} as const;

/**
 * Feature flags for enabling/disabling features
 */
export const FEATURE_FLAGS = {
  /** Enable geolocation feature */
  enableGeolocation: true,
  /** Enable favorites feature */
  enableFavorites: true,
  /** Enable temperature unit conversion */
  enableUnitConversion: true,
} as const;

/**
 * Cache configuration
 */
export const CACHE_CONFIG = {
  /** Weather data cache TTL (5 minutes) */
  weatherTTL: 5 * 60 * 1000,
  /** Cities search cache TTL (30 minutes) */
  citiesTTL: 30 * 60 * 1000,
} as const;

/**
 * Log a message in development mode
 */
export const devLog = (...args: unknown[]) => {
  if (DEBUG_ENABLED) {
    console.log("[Weatherly]", ...args);
  }
};

/**
 * Log an error
 */
export const logError = (error: unknown, context?: string) => {
  const message = context ? `[${context}]` : "";
  console.error("[Weatherly Error]", message, error);
};
