"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import styles from "./dashboard.module.css";

const KPI_COLORS = ["#a78bfa", "#f59e0b", "#34d399", "#60a5fa"];
const PIE_COLORS = ["#34d399", "#f59e0b", "#f87171"];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherErr, setWeatherErr] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(saved);
  }, []);

  // Poll tasks every 2s for live sync
  useEffect(() => {
    const id = setInterval(() => {
      const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
      setTasks(saved);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // Fetch weather via server-side proxy (avoids browser network issues)
  useEffect(() => {
    const fetchWeather = async (lat, lon, fallback = false) => {
      try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setWeather({ ...data.current, fallback });
      } catch {
        setWeatherErr(true);
      } finally {
        setWeatherLoading(false);
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

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const kpis = [
    { label: "Total Tasks", value: total, icon: "📋", color: KPI_COLORS[0] },
    { label: "Pending", value: pending, icon: "⏳", color: KPI_COLORS[1] },
    { label: "Completed", value: completed, icon: "✅", color: KPI_COLORS[2] },
    { label: "Completion Rate", value: `${rate}%`, icon: "🎯", color: KPI_COLORS[3] },
  ];

  // Bar chart: by priority
  const priorities = ["Low", "Medium", "High"];
  const barData = priorities.map((p) => ({
    name: p,
    Total: tasks.filter((t) => t.priority === p).length,
    Completed: tasks.filter((t) => t.priority === p && t.completed).length,
  }));

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "No Priority", value: tasks.filter((t) => !t.priority).length },
  ].filter((d) => d.value > 0);

  const weatherIcon = getWeatherIcon(weather?.weather_code);

  if (loading || !user) return null;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Welcome back, <strong>{user.username}</strong> 👋</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpis.map((k) => (
          <div key={k.label} className={styles.kpiCard} style={{ "--accent": k.color }}>
            <div className={styles.kpiIcon}>{k.icon}</div>
            <div className={styles.kpiValue}>{k.value}</div>
            <div className={styles.kpiLabel}>{k.label}</div>
            <div className={styles.kpiGlow}></div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        {/* Bar Chart */}
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>📊 Tasks by Priority</h2>
          {total === 0 ? (
            <p className={styles.empty}>Add tasks to see analytics</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "#1e1b4b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                  labelStyle={{ color: "#a78bfa" }}
                />
                <Bar dataKey="Total" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Completed" fill="#34d399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie Chart */}
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>🍩 Task Status</h2>
          {total === 0 ? (
            <p className={styles.empty}>Add tasks to see analytics</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#1e1b4b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                />
                <Legend
                  wrapperStyle={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Weather Widget */}
        <div className={styles.chartCard + " " + styles.weatherCard}>
          <h2 className={styles.chartTitle}>🌤 Weather{weather?.fallback ? " (Mumbai)" : ""}{weather?.mock ? " (Sample)" : ""}</h2>
          {weatherLoading && <p className={styles.empty}>Fetching weather...</p>}
          {weatherErr && <p className={styles.empty}>Weather unavailable</p>}
          {weather && !weatherLoading && (
            <div className={styles.weatherBody}>
              <div className={styles.weatherMain}>
                <span className={styles.weatherIcon}>{weatherIcon}</span>
                <span className={styles.weatherTemp}>{Math.round(weather.temperature_2m)}°C</span>
              </div>
              <p className={styles.weatherFeel}>Feels like {Math.round(weather.apparent_temperature)}°C</p>
              <div className={styles.weatherStats}>
                <div className={styles.weatherStat}>
                  <span>💧</span>
                  <span>{weather.relative_humidity_2m}%</span>
                  <small>Humidity</small>
                </div>
                <div className={styles.weatherStat}>
                  <span>🌬️</span>
                  <span>{Math.round(weather.wind_speed_10m)} km/h</span>
                  <small>Wind</small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className={styles.progressCard}>
          <div className={styles.progressHeader}>
            <span>Overall Progress</span>
            <span>{rate}%</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${rate}%` }}></div>
          </div>
          <p className={styles.progressNote}>{completed} of {total} tasks completed</p>
        </div>
      )}
    </div>
  );
}

function getWeatherIcon(code) {
  if (code === undefined || code === null) return "🌡️";
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code <= 3) return "☁️";
  if (code <= 49) return "🌫️";
  if (code <= 69) return "🌧️";
  if (code <= 79) return "🌨️";
  if (code <= 82) return "⛈️";
  if (code <= 99) return "🌩️";
  return "🌡️";
}
