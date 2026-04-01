export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat") || "19.07";
  const lon = searchParams.get("lon") || "72.87";

  // Try multiple free weather APIs
  const apis = [
    {
      url: `https://wttr.in/${lat},${lon}?format=j1`,
      parse: (data) => ({
        current: {
          temperature_2m: parseFloat(data.current_condition?.[0]?.temp_C),
          apparent_temperature: parseFloat(data.current_condition?.[0]?.FeelsLikeC),
          relative_humidity_2m: parseFloat(data.current_condition?.[0]?.humidity),
          wind_speed_10m: parseFloat(data.current_condition?.[0]?.windspeedKmph),
          weather_code: mapWttrCode(data.current_condition?.[0]?.weatherCode),
        },
      }),
    },
    {
      url: `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature&timezone=auto`,
      parse: (data) => data,
    },
  ];

  for (const api of apis) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(api.url, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) continue;
      const raw = await res.json();
      const data = api.parse(raw);
      return Response.json(data);
    } catch {
      continue;
    }
  }

  // All APIs failed — return mock data so the widget still renders
  return Response.json({
    current: {
      temperature_2m: 28,
      apparent_temperature: 31,
      relative_humidity_2m: 65,
      wind_speed_10m: 12,
      weather_code: 2,
    },
    mock: true,
  });
}

function mapWttrCode(code) {
  const c = parseInt(code);
  if (c === 113) return 0;  // Clear
  if (c <= 116) return 1;   // Partly cloudy
  if (c <= 122) return 3;   // Cloudy
  if (c <= 260) return 45;  // Fog
  if (c <= 329) return 61;  // Rain
  if (c <= 395) return 80;  // Thunderstorm
  return 2;
}
