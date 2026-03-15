import "./DailyForecast.css";
import { getDayName } from "../utils/weatherCodes";

export function DailyForecast({ dailyForecast, selectedDayIndex, onSelectDay }) {
  if (!dailyForecast || dailyForecast.length === 0) return null;

  return (
    <section className="wa-daily">
      <h3 className="wa-daily-title">Daily forecast</h3>
      <div className="wa-daily-grid">
        {dailyForecast.map((day, index) => (
          <button
            key={day.date}
            className={`wa-daily-card${index === selectedDayIndex ? " wa-daily-card--active" : ""}`}
            onClick={() => onSelectDay(index)}
            aria-pressed={index === selectedDayIndex}
          >
            <span className="wa-daily-day">{getDayName(day.date)}</span>
            <img
              src={day.icon}
              alt={day.description}
              className="wa-daily-icon"
            />
            <div className="wa-daily-temps">
              <span className="wa-daily-temp-max">{day.maxTemp}°</span>
              <span className="wa-daily-temp-min">{day.minTemp}°</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}