import "./CurrentWeather.css";
import { formatDate } from "../utils/weatherCodes";

export function CurrentWeather({ location, currentWeather, }) {
  if (!location || !currentWeather) return null;

  return (
    <div className="wa-current-weather">
      <header className="wa-current-header">
        <h2 className="wa-current-city">{location.displayName}</h2>
        <p className="wa-current-date">{formatDate(currentWeather.time)}</p>
      </header>

      <div className="wa-current-main">
        <img
          src={currentWeather.icon}
          alt={currentWeather.description}
          className="wa-current-icon"
        />
        <div className="wa-current-temp-container">
          <span className="wa-current-temp">{currentWeather.temperature}</span>
          <span className="wa-current-unit">{currentWeather.tempUnit}</span>
        </div>
      </div>

    </div>
  );
}
