import { useState, useEffect, useRef } from "react";
import "./Header.css";
import logoIcon from "../assets/images/logo.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import checkmarkIcon from "../assets/images/icon-checkmark.svg";

export function Header({ unit, onChangeUnit }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const isMetric = unit === "metric";

  function handleSelect(selectedUnit) {
    onChangeUnit(selectedUnit);
    setIsOpen(false);
  }

  return (
    <header className="wa-header">
      <div className="wa-logo">
        <img src={logoIcon} alt="" />
        {/* <span>WeatherNow</span> */}
      </div>
      <div className="wa-units-wrapper" ref={menuRef}>
        <button
          className="wa-units-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <img src={unitsIcon} alt="" />
          Units
          <img
            src={dropdownIcon}
            alt=""
            className={`wa-chevron ${isOpen ? "open" : ""}`}
          />
        </button>
        {isOpen && (
          <div className="wa-units-menu" role="menu">
            <p className="wa-units-menu-title">
              Switch to {isMetric ? "Imperial" : "Metric"}
            </p>
            <div className="wa-units-divider" />
            <p className="wa-units-menu-label">Temperature</p>
            <button
              className="wa-units-menu-item"
              role="menuitem"
              onClick={() => handleSelect("metric")}
            >
              Celsius (°C)
              {isMetric && <img src={checkmarkIcon} alt="Selected" />}
            </button>
            <button
              className="wa-units-menu-item"
              role="menuitem"
              onClick={() => handleSelect("imperial")}
            >
              Fahrenheit (°F)
              {!isMetric && <img src={checkmarkIcon} alt="Selected" />}
            </button>
            <div className="wa-units-divider" />
            <p className="wa-units-menu-label">Wind Speed</p>
            <button
              className="wa-units-menu-item"
              role="menuitem"
              onClick={() => handleSelect("metric")}
            >
              km/h
              {isMetric && <img src={checkmarkIcon} alt="Selected" />}
            </button>
            <button
              className="wa-units-menu-item"
              role="menuitem"
              onClick={() => handleSelect("imperial")}
            >
              mph
              {!isMetric && <img src={checkmarkIcon} alt="Selected" />}
            </button>
            <div className="wa-units-divider" />
            <p className="wa-units-menu-label">Precipitation</p>
            <button
              className="wa-units-menu-item"
              role="menuitem"
              onClick={() => handleSelect("metric")}
            >
              Millimeters (mm)
              {isMetric && <img src={checkmarkIcon} alt="Selected" />}
            </button>
            <button
              className="wa-units-menu-item"
              role="menuitem"
              onClick={() => handleSelect("imperial")}
            >
              Inches (in)
              {!isMetric && <img src={checkmarkIcon} alt="Selected" />}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
