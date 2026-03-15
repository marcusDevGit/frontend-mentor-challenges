import "./WeatherMetrics.css";

export function WeatherMetrics({ currentWeather }) {
  if (!currentWeather) return null;

  const metrics = [
    {
      label: "Feels like",
      value: `${currentWeather.feelsLike}${currentWeather.tempUnit}`,
    },
    {
      label: "Humidity",
      value: `${currentWeather.humidity}%`,
    },
    {
      label: "Wind",
      value: `${currentWeather.windSpeed} ${currentWeather.windUnit}`,
    },
    {
      label: "Precipitation",
      value: `${currentWeather.precipitation} ${currentWeather.precipUnit}`,
    },
  ];

  return (
    <div className="wa-metrics">
      {metrics.map(({ label, value }) => (
        <div key={label} className="wa-metric-card">
          <span className="wa-metric-label">{label}</span>
          <span className="wa-metric-value">{value}</span>
        </div>
      ))}
    </div>
  );
}
