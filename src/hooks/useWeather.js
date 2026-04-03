"use client";

import { useState, useEffect } from "react";
import { 
  WEATHER_DESCRIPTIONS, 
  PREDEFINED_CITIES, 
  WEATHER_API_URL, 
  WEATHER_REFRESH_INTERVAL 
} from "../constants";

/**
 * @returns {{ weather: import('../types').WeatherData | null, loading: boolean, error: boolean, nextCity: Function, prevCity: Function }}
 */
export function useWeather() {
  const [weatherList, setWeatherList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function mapWttrCode(code) {
    const c = parseInt(code);
    if (isNaN(c)) return 2; // Default fallback
    if (c === 0 || c === 113) return 0;  // Clear
    if (c <= 116) return 1;   // Partly cloudy
    if (c <= 122) return 3;   // Cloudy
    if (c <= 260) return 45;  // Fog
    if (c <= 329) return 61;  // Rain
    if (c <= 395) return 80;  // Thunderstorm
    return c; // Pass through if it's already a wmo code
  }

  useEffect(() => {
    const fetchCityWeather = async (lat, lon, fallbackName = null, timezone = null) => {
      try {
        const res = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}`);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        let locationName = fallbackName || "Unknown";
        if (!fallbackName) {
          try {
            const locRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            if (locRes.ok) {
              const locData = await locRes.json();
              locationName = locData.address?.city || locData.address?.town || locData.address?.village || locData.address?.county || "Unknown Location";
            }
          } catch (e) {
            console.error("Location lookup failed", e);
          }
        }

        const mappedCode = mapWttrCode(data.current?.weather_code || 0);

        return { 
          ...data.current, 
          weather_code: mappedCode,
          weather_desc: WEATHER_DESCRIPTIONS[mappedCode] || "Cloudy",
          mock: data.mock, 
          locationName, 
          timezone,
          fallback: !!fallbackName 
        };
      } catch (err) {
        console.error(err);
        return null;
      }
    };

    const fetchAllWeather = async (localLat = 19.07, localLon = 72.87, hasLocal = false) => {
      try {
        const promises = PREDEFINED_CITIES.map(city => fetchCityWeather(city.lat, city.lon, city.name, city.timezone));
        
        // Add user's local weather to the front if available
        if (hasLocal) {
          const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          promises.unshift(fetchCityWeather(localLat, localLon, null, localTz));
        }

        const results = await Promise.all(promises);
        const validResults = results.filter(r => r !== null);
        
        // Deduplication by location name
        const uniqueResults = [];
        const seenNames = new Set();
        for (const res of validResults) {
           if (!seenNames.has(res.locationName)) {
             seenNames.add(res.locationName);
             uniqueResults.push(res);
           }
        }
        
        if (uniqueResults.length > 0) {
          setWeatherList(uniqueResults);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => fetchAllWeather(coords.latitude, coords.longitude, true),
        () => fetchAllWeather()
      );
    } else {
      fetchAllWeather();
    }
  }, []);

  useEffect(() => {
    if (weatherList.length <= 1) return;
    
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % weatherList.length);
    }, WEATHER_REFRESH_INTERVAL);
    
    return () => clearInterval(intervalId);
  }, [weatherList, currentIndex]);

  const nextCity = () => {
    if (weatherList.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % weatherList.length);
    }
  };

  const prevCity = () => {
    if (weatherList.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + weatherList.length) % weatherList.length);
    }
  };

  return { 
    weather: weatherList.length > 0 ? weatherList[currentIndex] : null, 
    loading, 
    error,
    nextCity,
    prevCity
  };
}
