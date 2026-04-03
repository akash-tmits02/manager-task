/**
 * @typedef {Object} User
 * @property {string} username - Display name
 * @property {number} [loginTime] - Unix timestamp of login
 */

/**
 * @typedef {Object} Task
 * @property {number} id - Unique timestamp ID
 * @property {string} text - Task content
 * @property {boolean} completed - Is task done
 * @property {'Low'|'Medium'|'High'} priority - Priority level
 * @property {string} [createdAt] - Formatted date string
 */

/**
 * @typedef {Object} City
 * @property {number} lat - Latitude
 * @property {number} lon - Longitude
 * @property {string} name - City name
 * @property {string} timezone - IANA timezone (e.g. Asia/Kolkata)
 */

/**
 * @typedef {Object} WeatherData
 * @property {number} temperature_2m - Current temperature in Celsius
 * @property {number} apparent_temperature - "Feels like" temperature
 * @property {number} relative_humidity_2m - Humidity percentage
 * @property {number} wind_speed_10m - Wind speed in km/h
 * @property {number} weather_code - WMO weather code (0-99)
 * @property {string} [weather_desc] - Human readable description (e.g. "Clear Sky")
 * @property {string} [locationName] - Reverse geocoded city name
 * @property {string} [timezone] - Local timezone of the weather report
 * @property {boolean} [fallback] - Whether fallback location was used
 */

export {};
