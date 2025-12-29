import { useState, useCallback } from "react";

interface GeolocationState {
  loading: boolean;
  error: string | null;
  coordinates: { latitude: number; longitude: number } | null;
}

interface UseGeolocationReturn extends GeolocationState {
  getCurrentLocation: () => Promise<{ latitude: number; longitude: number } | null>;
}

/**
 * Custom hook for accessing the browser's Geolocation API
 *
 * Provides a simple interface to request the user's current location with
 * automatic error handling and user-friendly error messages.
 *
 * @returns {UseGeolocationReturn} Geolocation state and getCurrentLocation function
 * @property {boolean} loading - True while fetching location
 * @property {string | null} error - Error message if location access fails
 * @property {{latitude: number, longitude: number} | null} coordinates - User's current coordinates
 * @property {Function} getCurrentLocation - Function to request current location
 *
 * @example
 * const { loading, error, coordinates, getCurrentLocation } = useGeolocation();
 *
 * const handleGetLocation = async () => {
 *   const coords = await getCurrentLocation();
 *   if (coords) {
 *     console.log(`Location: ${coords.latitude}, ${coords.longitude}`);
 *   }
 * };
 *
 * @remarks
 * - Automatically handles permission denied, timeout, and unavailable errors
 * - Returns null if geolocation is not supported by the browser
 * - Provides user-friendly error messages for common failure scenarios
 * - Uses high accuracy mode with 10-second timeout
 * - Non-blocking: returns a Promise that resolves when location is obtained
 */
export const useGeolocation = (): UseGeolocationReturn => {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    coordinates: null,
  });

  const getCurrentLocation = useCallback(async () => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setState({
        loading: false,
        error: "Geolocation is not supported by your browser",
        coordinates: null,
      });
      return null;
    }

    setState({
      loading: true,
      error: null,
      coordinates: null,
    });

    return new Promise<{ latitude: number; longitude: number } | null>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setState({
            loading: false,
            error: null,
            coordinates,
          });
          resolve(coordinates);
        },
        (error) => {
          let errorMessage = "Unable to retrieve your location";

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location permission denied. Please enable location access in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out.";
              break;
          }

          setState({
            loading: false,
            error: errorMessage,
            coordinates: null,
          });
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }, []);

  return {
    ...state,
    getCurrentLocation,
  };
};
