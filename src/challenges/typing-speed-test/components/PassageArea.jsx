import React, { useEffect, useRef } from "react";
import "./PassageArea.css";

export function PassageArea({
  passage,
  currentIndex,
  errors,
  status,
  onKeyPress,
  onStart,
}) {
  const cursorRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Backspace" || e.key === " ") {
        e.preventDefault();
      }
      onKeyPress(e.key);
    }
    if (status === "running" || status === "idle") {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, onKeyPress]);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentIndex]);

  const isIdle = status === "idle";

  return (
    <div className="tst-passage-area">
      <div
        className={`tst-passage-text ${isIdle ? "tst-passage-text tst-passage-blurred" : ""}`}
      >
        <p>
          {passage.text.split("").map((char, index) => {
            let className = "";
            if (index < currentIndex) {
              className = errors.has(index)
                ? "tst-char-error"
                : "tst-char-correct";
            } else if (index === currentIndex) {
              className = "tst-char-cursor";
            }
            return (
              <span
                key={index}
                className={className}
                ref={index === currentIndex ? cursorRef : null}
              >
                {char}
              </span>
            );
          })}
        </p>
      </div>

      {isIdle && (
        <div className="tst-start-overlay">
          <button className="tst-start-btn" onClick={onStart}>
            Start Typing Test
          </button>
          <p className="tst-start-hint">Or click the text and start typing</p>
        </div>
      )}
    </div>
  );
}
