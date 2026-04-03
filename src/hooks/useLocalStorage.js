"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook to manage state synchronized with localStorage.
 * Handles SSR hydration and cross-tab synchronization.
 * 
 * @param {string} key - The localStorage key
 * @param {any} initialValue - The initial value if no data exists in localStorage
 * @returns {[any, Function]} - State and setter function
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isMounted, setIsMounted] = useState(false);

  // 1. Initial load from localStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // 2. Wrap the setter function to persist values
  const setValue = useCallback((value) => {
    try {
      setStoredValue((prevValue) => {
        const valueToStore = value instanceof Function ? value(prevValue) : value;
        
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          
          // Dispatch a custom event to notify other instances in the same tab
          window.dispatchEvent(new Event("local-storage-update"));
        }
        
        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  // 3. Cross-tab synchronization and internal event handling
  useEffect(() => {
    const handleStorageChange = (e) => {
      // "storage" event only fires on OTHER tabs
      if (e && e.key === key) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch (error) {
          console.error(error);
        }
      }
      
      // Handle internal events for the SAME tab
      if (!e) {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage-update", () => handleStorageChange());

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage-update", () => handleStorageChange());
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}
