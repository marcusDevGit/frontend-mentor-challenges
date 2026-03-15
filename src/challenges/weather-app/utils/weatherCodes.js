import iconSunny from "../assets/images/icon-sunny.webp";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import iconOvercast from "../assets/images/icon-overcast.webp";
import iconFog from "../assets/images/icon-fog.webp";
import iconDrizzle from "../assets/images/icon-drizzle.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";

const iconFileMap = {
  "icon-sunny.webp": iconSunny,
  "icon-partly-cloudy.webp": iconPartlyCloudy,
  "icon-overcast.webp": iconOvercast,
  "icon-fog.webp": iconFog,
  "icon-drizzle.webp": iconDrizzle,
  "icon-rain.webp": iconRain,
  "icon-snow.webp": iconSnow,
  "icon-storm.webp": iconStorm,
};

export function getWeatherIconUrl(weatherCode) {
  const filename = weatherCodeMap[weatherCode]?.icon;
  return filename ? iconFileMap[filename] ?? "" : "";
}

export const weatherCodeMap = {
  0: { icon: "icon-sunny.webp", description: "Clear sky" },
  1: { icon: "icon-sunny.webp", description: "Mainly clear" },
  2: { icon: "icon-partly-cloudy.webp", description: "Partly cloudy" },
  3: { icon: "icon-overcast.webp", description: "Overcast" },
  45: { icon: "icon-fog.webp", description: "Fog" },
  48: { icon: "icon-fog.webp", description: "Depositing rime fog" },
  51: { icon: "icon-drizzle.webp", description: "Light drizzle" },
  53: { icon: "icon-drizzle.webp", description: "Moderate drizzle" },
  55: { icon: "icon-drizzle.webp", description: "Dense drizzle" },
  56: { icon: "icon-drizzle.webp", description: "Light freezing drizzle" },
  57: { icon: "icon-drizzle.webp", description: "Dense freezing drizzle" },
  61: { icon: "icon-rain.webp", description: "Slight rain" },
  63: { icon: "icon-rain.webp", description: "Moderate rain" },
  65: { icon: "icon-rain.webp", description: "Heavy rain" },
  66: { icon: "icon-rain.webp", description: "Light freezing rain" },
  67: { icon: "icon-rain.webp", description: "Heavy freezing rain" },
  71: { icon: "icon-snow.webp", description: "Slight snow" },
  73: { icon: "icon-snow.webp", description: "Moderate snow" },
  75: { icon: "icon-snow.webp", description: "Heavy snow" },
  77: { icon: "icon-snow.webp", description: "Snow grains" },
  80: { icon: "icon-rain.webp", description: "Slight rain showers" },
  81: { icon: "icon-rain.webp", description: "Moderate rain showers" },
  82: { icon: "icon-rain.webp", description: "Violent rain showers" },
  85: { icon: "icon-snow.webp", description: "Slight snow showers" },
  86: { icon: "icon-snow.webp", description: "Heavy snow showers" },
  95: { icon: "icon-storm.webp", description: "Thunderstorm" },
  96: { icon: "icon-storm.webp", description: "Thunderstorm with slight hail" },
  99: { icon: "icon-storm.webp", description: "Thunderstorm with heavy hail" },
};

export function formatDate(isoDate) {
  if (!isoDate) return "";
  const datePart = String(isoDate).split("T")[0];
  const date = new Date(`${datePart}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getDayName(isoDate) {
  if (!isoDate) return "";
  const datePart = String(isoDate).split("T")[0];
  const date = new Date(`${datePart}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function getFullDayName(isoDate) {
  if (!isoDate) return "";
  const datePart = String(isoDate).split("T")[0];
  const date = new Date(`${datePart}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export function formatHour(isoDateTime) {
  const date = new Date(isoDateTime);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
}
