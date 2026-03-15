import { useState, useRef, useEffect } from "react";
import "./HourlyForecast.css";
import { getFullDayName, formatHour } from "../utils/weatherCodes";
import dropdownIcon from "../assets/images/icon-dropdown.svg";

export function HourlyForecast({
  hourlyForecast,
  dailyForecast,
  selectedDayIndex,
  onSelectDay,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!hourlyForecast || hourlyForecast.length === 0) return null;

  const selectedDay = dailyForecast[selectedDayIndex];

  function handleSelectDay(index) {
    onSelectDay(index);
    setIsOpen(false);
  }

  return (
    <section className="wa-hourly">
      <div className="wa-hourly-header">
        <h3 className="wa-hourly-title">Hourly forecast</h3>

        <div className="wa-hourly-dropdown-wrapper" ref={dropdownRef}>
          <button
            className="wa-hourly-dropdown-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            {getFullDayName(selectedDay.date)}
            <img
              src={dropdownIcon}
              alt=""
              className={`wa-hourly-chevron${isOpen ? " open" : ""}`}
            />
          </button>

          {isOpen && (
            <ul className="wa-hourly-day-list" role="listbox">
              {dailyForecast.map((day, index) => (
                <li
                  key={day.date}
                  role="option"
                  aria-selected={index === selectedDayIndex}
                >
                  <button
                    className={`wa-hourly-day-option${index === selectedDayIndex ? " wa-hourly-day-option--active" : ""}`}
                    onClick={() => handleSelectDay(index)}
                  >
                    {getFullDayName(day.date)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="wa-hourly-list">
        {hourlyForecast.map((hour) => (
          <div key={hour.time} className="wa-hourly-card">
            <span className="wa-hourly-time">{formatHour(hour.time)}</span>
            <img src={hour.icon} alt="" className="wa-hourly-icon" />
            <span className="wa-hourly-temp">{hour.temperature}°</span>
          </div>
        ))}
      </div>
    </section>
  );
}