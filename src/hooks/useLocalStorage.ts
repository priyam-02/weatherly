import { useState, useEffect } from "react";

/**
 * Custom hook for managing localStorage with React state synchronization
 *
 * Automatically persists state to localStorage and syncs across browser tabs/windows.
 * Provides a useState-like API with automatic JSON serialization/deserialization.
 *
 * @template T - Type of the value to store
 * @param {string} key - The localStorage key to use for storage
 * @param {T} initialValue - Default value if no value exists in localStorage
 * @returns {[T, (value: T | ((val: T) => T)) => void]} Tuple of [storedValue, setValue]
 *
 * @example
 * const [user, setUser] = useLocalStorage<User>("user", { name: "" });
 * setUser({ name: "John" }); // Automatically saves to localStorage
 * setUser(prev => ({ ...prev, age: 30 })); // Functional updates supported
 *
 * @remarks
 * - Automatically handles JSON serialization/deserialization
 * - Syncs changes across browser tabs/windows via storage event
 * - Gracefully handles errors (logs warnings, returns initial value)
 * - Supports functional updates like useState
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  // Get initial value from localStorage or use provided initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function (same API as useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error saving ${key} to localStorage:`, error);
    }
  };

  // Sync with localStorage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error syncing ${key} from storage event:`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
};
