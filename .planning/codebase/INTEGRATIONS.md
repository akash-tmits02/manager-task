# External Integrations

## APIs

### Weather APIs (Server-Side Proxy)

The dashboard fetches weather data through a server-side API route at `app/api/weather/route.js` to avoid CORS issues in the browser.

**Primary: wttr.in**
- URL: `https://wttr.in/{lat},{lon}?format=j1`
- Free, no API key required
- Response mapped via `mapWttrCode()` to standardized weather codes
- 5-second timeout with `AbortController`

**Fallback: Open-Meteo**
- URL: `https://api.open-meteo.com/v1/forecast`
- Free, no API key required
- Parameters: `latitude`, `longitude`, `current` (temperature_2m, relative_humidity_2m, wind_speed_10m, weather_code, apparent_temperature), `timezone=auto`
- Used if wttr.in fails

**Mock Fallback**
- If both APIs fail, returns hardcoded mock weather data
- Returns `{ mock: true }` flag to indicate sample data
- Default: 28°C, feels like 31°C, 65% humidity, 12 km/h wind

### Geolocation (Browser API)

- Uses `navigator.geolocation.getCurrentPosition()` on the client
- Falls back to Mumbai coordinates (19.07, 72.87) if denied or unavailable
- Dashboard shows "(Mumbai)" label when using fallback coordinates

## Databases

**None** — The application uses no database.

## Storage

### localStorage (Client-Side)

All persistent data is stored in the browser's `localStorage`:

| Key | Format | Used By |
|-----|--------|---------|
| `auth_user` | JSON `{ username, loginTime }` | `lib/auth.js` — login/logout state |
| `tasks` | JSON array of task objects | `app/tasks/page.js`, `app/dashboard/page.js`, `app/todos/page.js` |

**Task object shape:**
```js
{
  id: Date.now(),           // Unique ID via timestamp
  text: "task description",
  completed: false,
  priority: "Low" | "Medium" | "High",
  createdAt: "01 Apr 2026"  // Formatted via toLocaleDateString("en-IN")
}
```

## Authentication

- **Custom localStorage-based auth** — no external auth provider
- No real credential validation — any non-empty username/password is accepted
- Session state managed via React Context (`AuthContext` in `lib/auth.js`)
- No JWT, no cookies, no server-side session management
- Login persistence: user stays logged in until they click "Logout" or clear localStorage

## Webhooks / Events

**None** — No webhook integrations.

## Third-Party Services

**None** — No analytics, error tracking, or monitoring services.
