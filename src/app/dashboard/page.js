"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../lib/authStore";
import { useTaskStore } from "../../features/tasks/taskStore";
import { useWeather } from "../../hooks/useWeather";
import { KPI_COLORS, PIE_COLORS, TASK_PRIORITIES } from "../../constants";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { Card } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import BarChartIcon from "@mui/icons-material/BarChart";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuthStore();
  const router = useRouter();

  const { tasks, loading: tasksLoading } = useTaskStore();
  const { weather, loading: weatherLoading, error: weatherErr, nextCity, prevCity } = useWeather();

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  if (authLoading || !user || tasksLoading) return null;

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const kpis = [
    { label: "Total Tasks", value: total, Icon: ListAltIcon, color: KPI_COLORS[0] },
    { label: "Pending", value: pending, Icon: HourglassEmptyIcon, color: KPI_COLORS[1] },
    { label: "Completed", value: completed, Icon: CheckCircleOutlineIcon, color: KPI_COLORS[2] },
    { label: "Completion Rate", value: `${rate}%`, Icon: TrackChangesIcon, color: KPI_COLORS[3] },
  ];

  const barData = TASK_PRIORITIES.map((p) => ({
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

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Welcome back, <strong>{user.username}</strong> <WavingHandIcon className={styles.waveIcon} /></p>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        {kpis.map((k) => (
          <Card key={k.label} className={styles.kpiCard} style={{ background: k.color }}>
            <div className={styles.kpiLabel}>{k.label}</div>
            <div className={styles.kpiValue}>{k.value}</div>
            <div className={styles.kpiIcon}><k.Icon fontSize="inherit" /></div>
          </Card>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <Card className={styles.chartCard}>
          <h2 className={styles.chartTitle}><BarChartIcon className={styles.titleIcon} /> Tasks by Priority</h2>
          {total === 0 ? (
            <p className={styles.empty}>Add tasks to see analytics</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "#ffffff", border: "none", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                  labelStyle={{ color: "#2d3748", fontWeight: 700 }}
                  itemStyle={{ color: "#718096" }}
                />
                <Bar dataKey="Total" fill="#7a5cff" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Completed" fill="#2ed573" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card className={styles.chartCard}>
          <h2 className={styles.chartTitle}><DonutLargeIcon className={styles.titleIcon} /> Task Status</h2>
          {total === 0 ? (
            <p className={styles.empty}>Add tasks to see analytics</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={6}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#ffffff", border: "none", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                  itemStyle={{ color: "#2d3748", fontWeight: 600 }}
                />
                <Legend wrapperStyle={{ color: "#718096", fontSize: 13, paddingTop: 10, fontWeight: 500 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card className={`${styles.chartCard} ${styles.weatherCard}`}>
          <div className={`${styles.weatherGradient} ${weather ? getThemeClass(weather.weather_code, weather.temperature_2m) : ''}`}>
            {weatherLoading && <p className={styles.empty} style={{color:"#fff", position: "relative", zIndex:10}}>Fetching weather...</p>}
            {weatherErr && <p className={styles.empty} style={{color:"#fff", position: "relative", zIndex:10}}>Weather unavailable</p>}
            {weather && !weatherLoading && (
              <div key={weather.locationName} className={styles.carouselSlide}>
                {/* CSS Landscape Background */}
                <div className={styles.landscape}>
                   <div className={styles.sun}></div>
                   <div className={styles.cloud1}></div>
                   <div className={styles.cloud2}></div>
                   
                   <div className={styles.mountains}>
                     <div className={styles.mountainBack}></div>
                     <div className={styles.mountainFront}></div>
                   </div>
                   
                   <div className={styles.hills}>
                     <div className={styles.hillBack}></div>
                     <div className={styles.hillFront}></div>
                     <div className={styles.tree1}></div>
                     <div className={styles.tree2}></div>
                     <div className={styles.tree3}></div>
                   </div>

                   {/* Weather Overlays */}
                   {(weather.weather_code === 61 || weather.weather_code === 80) && <div className={styles.rainOverlay}></div>}
                   {weather.weather_code === 80 && <div className={styles.lightningStrike}></div>}
                   {weather.weather_code === 45 && <div className={styles.fogOverlay}></div>}

                   {/* Snow Particles (Freezing or Snow Code) */}
                   {(weather.temperature_2m <= 0 || (weather.weather_code >= 71 && weather.weather_code <= 77)) && (
                     <div className={styles.snowflakes}>
                       {[...Array(20)].map((_, i) => (
                         <div 
                           key={i} 
                           className={styles.snowflake} 
                           style={{ 
                             left: `${(i * 7) % 100}%`, 
                             width: `${(i % 3) + 2}px`,
                             height: `${(i % 3) + 2}px`,
                             animationDuration: `${(i % 2) + 2}s`,
                             animationDelay: `${i * 0.2}s`
                           }}
                         />
                       ))}
                     </div>
                   )}

                   {/* Floating Leaves (Chilly weather) */}
                   {weather.temperature_2m > 0 && weather.temperature_2m <= 10 && weather.wind_speed_10m <= 15 && (
                     <div className={styles.leaves}>
                       {[...Array(8)].map((_, i) => (
                         <div 
                           key={i} 
                           className={styles.leaf} 
                           style={{ 
                             left: `${(i * 15) % 100}%`, 
                             animationDuration: `${(i % 4) + 3}s`,
                             animationDelay: `${i * 0.5}s`
                           }}
                         />
                       ))}
                     </div>
                   )}

                   {/* Gentle Wind / Clear Sky Leaves (Reduced Frequency) */}
                   {weather.weather_code === 0 && weather.wind_speed_10m > 5 && weather.wind_speed_10m <= 15 && (
                     <div className={styles.leaves}>
                       {[...Array(3)].map((_, i) => (
                         <div 
                           key={i} 
                           className={styles.leaf} 
                           style={{ 
                             left: `${(i * 30 + 10) % 100}%`, 
                             animationDuration: `${(i % 3) + 4}s`,
                             animationDelay: `${i * 1.5}s`
                           }}
                         />
                       ))}
                     </div>
                   )}

                   {/* Strong Wind (Horizontal Blowing Leaves) */}
                   {weather.wind_speed_10m > 15 && (
                     <div className={styles.windContainer}>
                        <div className={styles.windLines}></div>
                        <div className={styles.leaves}>
                          {[...Array(weather.weather_code === 0 ? 6 : 12)].map((_, i) => (
                            <div 
                              key={i} 
                              className={styles.leafFast} 
                              style={{ 
                                top: `${(i * 15) % 60 + 10}%`, 
                                animationDuration: `${(i % 3) * 0.2 + 0.6}s`,
                                animationDelay: `${i * 0.3}s`
                              }}
                            />
                          ))}
                        </div>
                     </div>
                   )}

                   {/* Rain Particles (Liquid rain only if above chilly threshold) */}
                   {weather.weather_code === 61 && weather.temperature_2m > 10 && (
                     <div className={styles.raindrops}>
                       {[...Array(30)].map((_, i) => (
                         <div 
                           key={i} 
                           className={styles.raindrop} 
                           style={{ 
                             left: `${(i * 13) % 100}%`, 
                             animationDuration: `${(i % 5) * 0.1 + 0.4}s`,
                             animationDelay: `${i * 0.1}s`
                           }}
                         />
                       ))}
                     </div>
                   )}
                </div>

                <div className={styles.weatherContent} style={{ position: "relative", zIndex: 5, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  
                  <div className={styles.weatherTopPanel}>
                    <div className={styles.weatherHeaderLeft}>
                      <div className={styles.locationWrap}>
                        <LocationOnIcon className={styles.locIcon} />
                        <span>{weather.locationName || "Unknown"}</span>
                      </div>
                      <div className={styles.dateWrap}>
                        Today{" "} 
                        {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: weather.timezone })} - {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: weather.timezone })}
                      </div>
                    </div>
                    <div className={styles.weatherDescription} style={{fontSize: "10px"}}>
                      {weather.weather_desc}
                    </div>
                  </div>

                  <div className={styles.weatherNavWrapper}>
                    <button className={styles.navButton} onClick={(e) => { e.stopPropagation(); prevCity(); }} aria-label="Previous City">
                      <ChevronLeftIcon />
                    </button>
                    <button className={styles.navButton} onClick={(e) => { e.stopPropagation(); nextCity(); }} aria-label="Next City">
                      <ChevronRightIcon />
                    </button>
                  </div>

                  <div className={styles.weatherCenterPanel}>
                    <span className={styles.weatherMassiveTemp} style={{fontSize: "80px"}}>{Math.round(weather.temperature_2m)}°</span>
                  </div>
                  
                  <div className={styles.weatherBottomPanel}>
                    <h4 className={styles.forecastTitle}>Weather Today</h4>
                    <div className={styles.forecastList}>
                      
                      <div className={styles.forecastItem}>
                        <div className={styles.forecastIconWrap}>
                          <OpacityIcon fontSize="inherit" />
                        </div>
                        <span className={styles.forecastTime}>Humidity</span>
                        <span className={styles.forecastTemp}>{weather.relative_humidity_2m}%</span>
                      </div>

                      <div className={styles.forecastItem}>
                        <div className={styles.forecastIconWrap}>
                          <AirIcon fontSize="inherit" />
                        </div>
                        <span className={styles.forecastTime}>Wind</span>
                        <span className={styles.forecastTemp}>{Math.round(weather.wind_speed_10m)} km/h</span>
                      </div>

                      <div className={styles.forecastItem}>
                        <div className={styles.forecastIconWrap}>
                          <DeviceThermostatIcon fontSize="inherit" />
                        </div>
                        <span className={styles.forecastTime}>Feels Like</span>
                        <span className={styles.forecastTemp}>{Math.round(weather.apparent_temperature)}°</span>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {total > 0 && (
        <Card className={styles.progressCard}>
          <div className={styles.progressHeader}>
            <span>Overall Progress</span>
            <span>{rate}%</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${rate}%` }}></div>
          </div>
          <p className={styles.progressNote}>{completed} of {total} tasks completed</p>
        </Card>
      )}
    </div>
  );
}

function getThemeClass(code, temp) {
  if (code === undefined || code === null) return styles.themeClear;
  
  // High priority: Temperature thresholds
  if (temp !== undefined && temp <= 0) return styles.themeSnow;
  if (temp !== undefined && temp <= 10) return styles.themeChilly;

  const c = parseInt(code);
  if (c === 0) return styles.themeClear;
  if (c === 1) return styles.themePartlyCloudy;
  if (c === 2 || c === 3) return styles.themeCloudy;
  if (c === 45) return styles.themeFog;
  if (c === 61) return styles.themeRain;
  if (c >= 71 && c <= 77) return styles.themeSnow;
  if (c === 80) return styles.themeThunder;
  return styles.themeClear;
}

function getWeatherIcon(code, temp) {
  if (temp !== undefined && temp <= 0) return <AcUnitIcon fontSize="inherit" />;
  
  if (code === undefined || code === null) return <DeviceThermostatIcon fontSize="inherit" />;
  if (code === 0) return <WbSunnyIcon fontSize="inherit" />;
  if (code <= 2) return <CloudQueueIcon fontSize="inherit" />;
  if (code <= 3) return <CloudIcon fontSize="inherit" />;
  if (code <= 49) return <CloudQueueIcon fontSize="inherit" />;
  if (code <= 69) return <WaterDropIcon fontSize="inherit" />;
  if (code <= 79) return <AcUnitIcon fontSize="inherit" />;
  if (code <= 82) return <ThunderstormIcon fontSize="inherit" />;
  if (code <= 99) return <ThunderstormIcon fontSize="inherit" />;
  return <DeviceThermostatIcon fontSize="inherit" />;
}
