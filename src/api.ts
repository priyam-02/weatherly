/**
 * API configuration for serverless functions
 * API keys are now securely stored server-side in environment variables
 */

export interface GeoApiOptions {
  method: string;
}

export const geoApiOptions: GeoApiOptions = {
  method: "GET",
};

export const GEO_API_URL = "/api/cities";
export const WEATHER_API_URL = "/api/weather";
