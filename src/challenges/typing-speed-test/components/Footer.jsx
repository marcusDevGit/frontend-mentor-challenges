import React from "react";
import "./Footer.css";
import iconRestart from "../assets/images/icon-restart.svg";

export function Footer({ onRestart }) {
  return (
    <footer className="tst-footer">
      <button className="tst-restart-btn" onClick={onRestart}>
        <span>Restart Test</span>
        <img src={iconRestart} alt="Restart" className="tst-restart-icon" />
      </button>
    </footer>
  );
}
