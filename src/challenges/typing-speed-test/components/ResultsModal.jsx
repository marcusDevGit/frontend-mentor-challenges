import React from "react";
import "./ResultsModal.css";
import iconCompleted from "../assets/images/icon-completed.svg";
import iconNewPb from "../assets/images/icon-new-pb.svg";

const RESULT_MESSAGES = {
  baseline: {
    icon: iconNewPb,
    title: "Baseline Established!",
    subtitle: "This is your starting point. Can you beat it?",
  },
  "new-record": {
    icon: iconNewPb,
    title: "High Score Smashed!",
    subtitle: "You just set a new personal best!",
  },
  complete: {
    icon: iconCompleted,
    title: "Test Complete!",
    subtitle: "Great effort! Keep practicing to improve.",
  },
};

export function ResultsModal({
  finalWpm,
  finalAccuracy,
  correctChars,
  totalErrors,
  resultType,
  onRestart,
}) {
  const message = RESULT_MESSAGES[resultType] || RESULT_MESSAGES.complete;

  return (
    <div className="tst-results-overlay">
      <div className="tst-results-modal">
        <img src={message.icon} alt="" className="tst-results-icon" />
        <h2 className="tst-results-title">{message.title}</h2>
        <p className="tst-results-subtitle">{message.subtitle}</p>

        <div className="tst-results-stats">
          <div className="tst-results-stat">
            <span className="tst-results-stat-value">{finalWpm}</span>
            <span className="tst-results-stat-label">WPM</span>
          </div>
          <div className="tst-results-stat">
            <span className="tst-results-stat-value">{finalAccuracy}%</span>
            <span className="tst-results-stat-label">Accuracy</span>
          </div>
          <div className="tst-results-stat">
            <span className="tst-results-stat-value">{correctChars}</span>
            <span className="tst-results-stat-label">Correct</span>
          </div>
          <div className="tst-results-stat">
            <span className="tst-results-stat-value">{totalErrors}</span>
            <span className="tst-results-stat-label">Errors</span>
          </div>
        </div>

        <button className="tst-results-btn" onClick={onRestart}>
          Try Again
        </button>
      </div>
    </div>
  );
}
