import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing a value
 *
 * Delays updating the debounced value until after the specified delay
 * has elapsed since the last value change. Useful for search inputs
 * and other scenarios where you want to limit API calls.
 *
 * @template T - Type of the value to debounce
 * @param {T} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @returns {T} The debounced value
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearchTerm = useDebounce(searchTerm, 600);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform API call with debounced value
 *     fetchResults(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 */
export const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timeout to update the debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes before delay expires
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
