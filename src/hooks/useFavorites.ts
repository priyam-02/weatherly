import { useCallback } from "react";
import { CityOption } from "../types/location.types";
import { useLocalStorage } from "./useLocalStorage";
import { FAVORITES_CONFIG } from "../config/constants";

export interface FavoriteLocation {
  id: string;
  label: string;
  value: string; // "lat lon"
  savedAt: number;
}

interface UseFavoritesReturn {
  favorites: FavoriteLocation[];
  addFavorite: (location: CityOption) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (value: string) => boolean;
  toggleFavorite: (location: CityOption) => void;
}

const { MAX_FAVORITES, STORAGE_KEY } = FAVORITES_CONFIG;

/**
 * Custom hook for managing favorite weather locations
 *
 * Provides functionality to add, remove, toggle, and check favorite locations
 * with automatic localStorage persistence. Limits favorites to MAX_FAVORITES (10).
 *
 * @returns {UseFavoritesReturn} Favorites state and management functions
 * @property {FavoriteLocation[]} favorites - Array of favorite locations
 * @property {Function} addFavorite - Add a location to favorites
 * @property {Function} removeFavorite - Remove a favorite by ID
 * @property {Function} isFavorite - Check if a location is favorited
 * @property {Function} toggleFavorite - Add or remove a favorite
 *
 * @example
 * const { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite } = useFavorites();
 *
 * const location = { value: "40.7128 -74.0060", label: "New York, US" };
 * addFavorite(location); // Adds to favorites
 * toggleFavorite(location); // Removes if exists, adds if doesn't
 * const isInFavorites = isFavorite(location.value); // Check if favorited
 * removeFavorite(favoriteId); // Remove by ID
 *
 * @remarks
 * - Maximum 10 favorites (configurable via FAVORITES_CONFIG.MAX_FAVORITES)
 * - Automatically persists to localStorage
 * - Prevents duplicate favorites
 * - New favorites added to the beginning of the list
 * - Each favorite has a unique ID and savedAt timestamp
 */
export const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteLocation[]>(
    STORAGE_KEY,
    []
  );

  const addFavorite = useCallback(
    (location: CityOption) => {
      setFavorites((prev) => {
        // Check if already exists
        if (prev.some((fav) => fav.value === location.value)) {
          return prev;
        }

        // Limit to MAX_FAVORITES
        const newFavorite: FavoriteLocation = {
          id: crypto.randomUUID(),
          label: location.label,
          value: location.value,
          savedAt: Date.now(),
        };

        const updated = [newFavorite, ...prev].slice(0, MAX_FAVORITES);
        return updated;
      });
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (value: string) => {
      return favorites.some((fav) => fav.value === value);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (location: CityOption) => {
      const existing = favorites.find((fav) => fav.value === location.value);
      if (existing) {
        removeFavorite(existing.id);
      } else {
        addFavorite(location);
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
};
