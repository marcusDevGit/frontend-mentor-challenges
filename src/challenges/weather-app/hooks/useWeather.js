import { useState, useCallback } from "react";
import { weatherCodeMap, getWeatherIconUrl } from "../utils/weatherCodes";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [searchStatus, setSearchStatus] = useState("idle");
  const [searchError, setSearchError] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const searchLocation = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResult([]);
      setSearchStatus("idle");
      setSearchError(null);
      return;
    }

    setSearchError(null);
    setSearchStatus("searching");

    try {
      const response = await fetch(
        `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`,
      );
      if (!response.ok) {
        throw new Error("Failed to search location");
      }
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        setSearchResult([]);
        setSearchStatus("not-found");
        return;
      }
      const results = data.results.map((result) => ({
        id: result.id,
        name: result.name,
        region: result.admin1 || "",
        country: result.country || "",
        latitude: result.latitude,
        longitude: result.longitude,
        displayName: [result.name, result.admin1, result.country]
          .filter(Boolean)
          .join(", "),
      }));
      setSearchResult(results);
      setSearchStatus("success");
    } catch (err) {
      console.log("Search error:", err);
      setSearchResult([]);
      setSearchError(err.message);
      setSearchStatus("error");
    }
  }, []);

  const fetchWeather = useCallback(
    async (selectedLocation, selectedUnit = unit) => {
      setStatus("loading");
      setError(null);
      setSelectedDayIndex(0);

      const isImperial = selectedUnit === "imperial";
      const tempUnit = isImperial ? "fahrenheit" : "celsius";
      const windApiUnit = isImperial ? "mph" : "kmh";
      const precipUnit = isImperial ? "inch" : "mm";

      const params = new URLSearchParams({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "apparent_temperature",
          "weather_code",
          "wind_speed_10m",
          "precipitation",
        ].join(","),
        daily: [
          "weather_code",
          "temperature_2m_max",
          "temperature_2m_min",
        ].join(","),
        hourly: ["temperature_2m", "weather_code"].join(","),
        temperature_unit: tempUnit,
        wind_speed_unit: windApiUnit,
        precipitation_unit: precipUnit,
        timezone: "auto",
        forecast_days: 7,
      });
      try {
        const response = await fetch(`${FORECAST_URL}?${params}`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setWeather(data);
        setLocation(selectedLocation);
        setStatus("loaded");
      } catch (err) {
        console.log("Forecast error:", err);
        setError(err.message);
        setStatus("error");
      }
    },
    [unit],
  );

  const selectedLocation = useCallback(
    (selectedLocation) => {
      setSearchResult([]);
      setSearchError(null);
      setSearchStatus("idle");
      fetchWeather(selectedLocation);
    },
    [fetchWeather],
  );

  const changeUnit = useCallback(
    (newUnit) => {
      setUnit(newUnit);
      if (location) {
        fetchWeather(location, newUnit);
      }
    },
    [location, fetchWeather],
  );

  const retry = useCallback(() => {
    if (location) {
      fetchWeather(location);
    }
  }, [location, fetchWeather]);

  const currentWeather = weather
    ? {
        temperature: Math.round(weather.current.temperature_2m),
        feelsLike: Math.round(weather.current.apparent_temperature),
        humidity: weather.current.relative_humidity_2m,
        windSpeed: Math.round(weather.current.wind_speed_10m),
        precipitation: weather.current.precipitation,
        weatherCode: weather.current.weather_code,
        tempUnit: unit === "imperial" ? "ºF" : "ºC",
        windUnit: unit === "imperial" ? "mph" : "km/h",
        precipUnit: unit === "imperial" ? "in" : "mm",
        time: weather.current.time,
        icon: getWeatherIconUrl(weather.current.weather_code),
        description: weatherCodeMap[weather.current.weather_code]?.description ?? "",
        }
    : null;

  const dailyForecast = weather
    ? weather.daily.time.map((date, index) => ({
        date,
        weatherCode: weather.daily.weather_code[index],
        maxTemp: Math.round(weather.daily.temperature_2m_max[index]),
        minTemp: Math.round(weather.daily.temperature_2m_min[index]),
        icon: getWeatherIconUrl(weather.daily.weather_code[index]),
        description: weatherCodeMap[weather.daily.weather_code[index]]?.description ?? "",
      }))
    : [];

  const hourlyForecast = weather
    ? (() => {
        const selectedDate = weather.daily.time[selectedDayIndex];
        const hours = [];
        for (let i = 0; i < weather.hourly.time.length; i++) {
          if (weather.hourly.time[i].startsWith(selectedDate)) {
            hours.push({
              time: weather.hourly.time[i],
              temperature: Math.round(weather.hourly.temperature_2m[i]),
              weatherCode: weather.hourly.weather_code[i],
              icon: getWeatherIconUrl(weather.hourly.weather_code[i]),
              description: weatherCodeMap[weather.hourly.weather_code[i]]?.description ?? "",
            });
          }
        }
        return hours.slice(0, 8);
      })()
    : [];

  return {
    status,
    error,
    unit,
    selectedDayIndex,
    location,
    currentWeather,
    dailyForecast,
    hourlyForecast,
    searchResult,
    searchStatus,
    searchError,
    searchLocation,
    selectedLocation,
    changeUnit,
    setSelectedDayIndex,
    retry,
  };
}
