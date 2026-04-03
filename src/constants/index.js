export const TASK_PRIORITIES = ["Low", "Medium", "High"];

export const PRIORITY_COLORS = { 
  Low: "#2ed573", 
  Medium: "#ff9f43", 
  High: "#ff4785" 
};

export const KPI_COLORS = ["#ff4785", "#7a5cff", "#ff9f43", "#2ed573"];
export const PIE_COLORS = ["#2ed573", "#ff9f43", "#ff4785", "#7a5cff"];

export const DEFAULT_TASK_PRIORITY = "Medium";
export const TASK_FILTERS = ["All", "Pending", "Completed"];

export const WEATHER_API_URL = "/api/weather";
export const WEATHER_REFRESH_INTERVAL = 30000; // 30s

export const WEATHER_DESCRIPTIONS = {
  0: "Clear Sky",
  1: "Partly Cloudy",
  2: "Cloudy",
  3: "Overcast",
  45: "Misty Fog",
  61: "Rainy Day",
  71: "Light Snow",
  73: "Snowy",
  75: "Heavy Snow",
  80: "Thunderstorm"
};

export const PREDEFINED_CITIES = [
  { lat: 19.07, lon: 72.87, name: "Mumbai", timezone: "Asia/Kolkata" },
  { lat: 40.7128, lon: -74.0060, name: "New York", timezone: "America/New_York" },
  { lat: 51.5074, lon: -0.1278, name: "London", timezone: "Europe/London" },
  { lat: 35.6762, lon: 139.6503, name: "Tokyo", timezone: "Asia/Tokyo" },
  { lat: 48.8566, lon: 2.3522, name: "Paris", timezone: "Europe/Paris" },
  { lat: -33.8688, lon: 151.2093, name: "Sydney", timezone: "Australia/Sydney" },
  { lat: 15.8497, lon: 74.6097, name: "Belgaum", timezone: "Asia/Kolkata" },
  { lat: 78.2232, lon: 15.6469, name: "Longyearbyen", timezone: "Arctic/Longyearbyen" },
];
