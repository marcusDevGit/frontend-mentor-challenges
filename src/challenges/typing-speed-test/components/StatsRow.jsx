import React from "react";
import "./StatsRow.css";

export function StatsRow({ wpm, accuracy, time }) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="tst-stats-row">
      <div className="tst-stat">
        <span className="tst-stat-label">WPM:</span>
        <span className="tst-stat-value">{wpm}</span>
      </div>

      <div className="tst-stat-divider"></div>

      <div className="tst-stat">
        <span className="tst-stat-label">Accuracy:</span>
        <span className="tst-stat-value">{accuracy}%</span>
      </div>

      <div className="tst-stat-divider"></div>

      <div className="tst-stat">
        <span className="tst-stat-label">Time:</span>
        <span className="tst-stat-value">{formattedTime}</span>
      </div>
    </div>
  );
}
