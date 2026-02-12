import { useEffect, useState } from "react";

// Reusable hook to keep React state in sync with localStorage
export default function useLocalStorage(key, initialValue) {
  // Read the initial value from localStorage one time (on first render)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      // If we already have saved data, use it.
      // Otherwise, start with the provided initial value.
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If parsing fails, fall back to initialValue so app still works
      console.error("Failed to read from localStorage:", error);
      return initialValue;
    }
  });

  // Whenever key or value changes, save the latest value to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // If saving fails (storage full, privacy mode, etc.), keep app running
      console.error("Failed to write to localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
