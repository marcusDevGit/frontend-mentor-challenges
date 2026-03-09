import React from "react";
import "./Header.css";
import logoSmall from "../assets/images/logo-small.svg";
import logoLarge from "../assets/images/logo-large.svg";
import iconPb from "../assets/images/icon-personal-best.svg";

export function Header({ personalBest }) {
  return (
    <header className="tst-header">
      <img
        src={logoSmall}
        alt="Typing Speed Test"
        className="tst-logo tst-logo-small"
      />
      <img
        src={logoLarge}
        alt="Typing Speed Test"
        className="tst-logo tst-logo-large"
      />

      <div className="tst-personal-best">
        <img src={iconPb} alt="Trophy" className="tst-pb-icon" />
        <span>
          Best: <strong>{personalBest ? `${personalBest} WPM` : "-"}</strong>
        </span>
      </div>
    </header>
  );
}
