"use client";

import { useState, useEffect } from "react";

/**
 * @returns {{ weather: import('../types').WeatherData | null, loading: boolean, error: boolean }}
 */
export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async (lat, lon, fallback = false) => {
      try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setWeather({ ...data.current, fallback, mock: data.mock });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => fetchWeather(coords.latitude, coords.longitude),
        () => fetchWeather(19.07, 72.87, true)
      );
    } else {
      fetchWeather(19.07, 72.87, true);
    }
  }, []);

  return { weather, loading, error };
}
