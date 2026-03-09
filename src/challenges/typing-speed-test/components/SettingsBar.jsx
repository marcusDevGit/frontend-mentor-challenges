import React from "react";
import "./SettingsBar.css";
import iconArrow from "../assets/images/icon-down-arrow.svg";

const DIFFICULTIES = ["easy", "medium", "hard"];
const MODES = [
  {
    value: "timed",
    label: "Timed (60s)",
  },
  {
    value: "passage",
    label: "Passage",
  },
];
export function SettingsBar({
  difficulty,
  mode,
  onChangeDifficulty,
  onChangeMode,
}) {
  const diffLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  const modeLabel = MODES.find((m) => m.value === mode)?.label || mode;

  return (
    <div className="tst-settings">
      {/* === MOBILE: Dropdowns === */}
      <div className="tst-settings-mobile">
        <button
          className="tst-select-btn"
          onClick={() => {
            const next = { easy: "medium", medium: "hard", hard: "easy" }[
              difficulty
            ];
            onChangeDifficulty(next);
          }}
        >
          <span>{diffLabel}</span>
          <img src={iconArrow} alt="Abrir" className="tst-select-icon" />
        </button>
        <button
          className="tst-select-btn"
          onClick={() => {
            onChangeMode(mode === "timed" ? "passage" : "timed");
          }}
        >
          <span>{modeLabel}</span>
          <img src={iconArrow} alt="Abrir" className="tst-select-icon" />
        </button>
      </div>

      {/* === TABLET+: Botões inline com labels === */}
      <div className="tst-settings-desktop">
        <div className="tst-settings-group">
          <span className="tst-settings-label">Difficulty:</span>
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff}
              className={`tst-toggle-btn ${difficulty === diff ? "tst-toggle-active" : ""}`}
              onClick={() => onChangeDifficulty(diff)}
            >
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
          ))}
        </div>

        <div className="tst-settings-divider"></div>

        <div className="tst-settings-group">
          <span className="tst-settings-label">Mode:</span>
          {MODES.map((m) => (
            <button
              key={m.value}
              className={`tst-toggle-btn ${mode === m.value ? "tst-toggle-active" : ""}`}
              onClick={() => onChangeMode(m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
