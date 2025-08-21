// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  console.log(`useLocalStorage: Initializing for key "${key}"`);
  
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      console.log(`useLocalStorage: Found item for "${key}":`, item);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`useLocalStorage: Error reading "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      console.log(`useLocalStorage: Setting "${key}" to:`, value);
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`useLocalStorage: Error setting "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}