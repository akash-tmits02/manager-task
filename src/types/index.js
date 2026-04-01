/**
 * @typedef {Object} Task
 * @property {number} id - Unique timestamp ID
 * @property {string} text - Task content
 * @property {boolean} completed - Is task done
 * @property {'Low'|'Medium'|'High'} priority - Priority level
 * @property {string} createdAt - Formatted date string
 */

/**
 * @typedef {Object} WeatherData
 * @property {number} temperature_2m - Current temp
 * @property {number} apparent_temperature - Feels like
 * @property {number} relative_humidity_2m - Humidity
 * @property {number} wind_speed_10m - Wind speed
 * @property {number} weather_code - WMO weather code
 * @property {boolean} fallback - Whether fallback location was used
 */

export {};
