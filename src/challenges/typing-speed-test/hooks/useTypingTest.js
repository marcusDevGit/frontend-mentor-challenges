import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { getRandomPassage } from "../utils/passages";

const TIMED_DURATION = 60;

export function useTypingTest() {
  const [difficulty, setDifficulty] = useState("hard");
  const [mode, setMode] = useState("timed");
  const [status, setStatus] = useState("idle");
  const [passage, setPassage] = useState(() => getRandomPassage("hard"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(new Set());
  const [totalErrors, setTotalErrors] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TIMED_DURATION);
  const timerRef = useRef(null);
  const [personalBest, setPersonalBest] = useState(() => {
    const saved = localStorage.getItem("tst-personal-best");
    return saved ? Number(saved) : null;
  });

  const calculateWPM = useCallback((charsTyped, seconds) => {
    if (seconds <= 0) return 0;
    const minutes = seconds / 60;
    const words = charsTyped / 5;
    return Math.round(words / minutes);
  }, []);

  const calculateAccuracy = useCallback((charsTyped, errorCount) => {
    if (charsTyped === 0) return 100;
    const correct = charsTyped - errorCount;
    return Math.round((correct / charsTyped) * 100);
  }, []);

  useEffect(() => {
    if (status !== "running") return;

    timerRef.current = setInterval(() => {
      if (mode === "timed") {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setStatus("finished");
            return 0;
          }
          return prev - 1;
        });
      }
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [status, mode]);

  const wpm = useMemo(() => {
    if (status !== "running" || timeElapsed <= 0) return 0;
    return calculateWPM(currentIndex, timeElapsed);
  }, [status, currentIndex, timeElapsed, calculateWPM]);

  const accuracy = useMemo(() => {
    if (status !== "running" || currentIndex <= 0) return 100;
    return calculateAccuracy(currentIndex, totalErrors);
  }, [status, currentIndex, totalErrors, calculateAccuracy]);

  const handleKeyPress = useCallback(
    (key) => {
      if (status === "finished") return;
      if (status === "idle") {
        setStatus("running");
      }
      if (key === "Backspace") {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
        return;
      }

      if (key.length !== 1) return;
      const expectedChar = passage.text[currentIndex];
      if (key !== expectedChar) {
        setErrors((prev) => new Set(prev).add(currentIndex));
        setTotalErrors((prev) => prev + 1);
      }
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      if (nextIndex >= passage.text.length) {
        clearInterval(timerRef.current);
        setStatus("finished");
      }
    },
    [status, currentIndex, passage],
  );

  const startTest = useCallback(() => {
    setStatus("running");
  }, []);

  const restartTest = useCallback(() => {
    clearInterval(timerRef.current);
    const saved = localStorage.getItem("tst-personal-best");
    setPersonalBest(saved ? Number(saved) : null);

    setPassage(getRandomPassage(difficulty));
    setCurrentIndex(0);
    setErrors(new Set());
    setTotalErrors(0);
    setTimeElapsed(0);
    setTimeRemaining(TIMED_DURATION);
    setStatus("idle");
  }, [difficulty]);

  const changeDifficulty = useCallback(
    (newDifficulty) => {
      setDifficulty(newDifficulty);
      if (status !== "running") {
        setPassage(getRandomPassage(newDifficulty));
        setCurrentIndex(0);
        setErrors(new Set());
        setTotalErrors(0);
      }
    },
    [status],
  );

  const changeMode = useCallback(
    (newMode) => {
      if (status !== "running") {
        setMode(newMode);
        setTimeRemaining(TIMED_DURATION);
        setTimeElapsed(0);
      }
    },
    [status],
  );

  const finalWpm = useMemo(() => {
    if (status !== "finished" || timeElapsed <= 0) return 0;
    return calculateWPM(currentIndex, timeElapsed);
  }, [status, currentIndex, timeElapsed, calculateWPM]);

  const finalAccuracy = useMemo(() => {
    if (status !== "finished" || currentIndex === 0) return 100;
    return calculateAccuracy(currentIndex, totalErrors);
  }, [status, currentIndex, totalErrors, calculateAccuracy]);

  const resultType = useMemo(() => {
    if (status !== "finished") return null;
    if (personalBest === null) return "baseline";
    if (finalWpm > personalBest) return "new-record";
    return "complete";
  }, [status, personalBest, finalWpm]);

  useEffect(() => {
    if (status !== "finished") return;
    if (finalWpm <= 0) return;

    const saved = localStorage.getItem("tst-personal-best");
    const currentBest = saved ? Number(saved) : null;

    if (currentBest === null || finalWpm > currentBest) {
      localStorage.setItem("tst-personal-best", String(finalWpm));
    }
  }, [status, finalWpm]);

  return {
    // Estado
    status,
    passage,
    difficulty,
    mode,
    currentIndex,
    errors,
    // Estatísticas
    wpm,
    accuracy,
    time: mode === "timed" ? timeRemaining : timeElapsed,
    timeElapsed,
    // Resultados (para o modal)
    finalWpm,
    finalAccuracy,
    totalErrors,
    totalChars: passage.text.length,
    correctChars: currentIndex - totalErrors,
    resultType,
    personalBest,
    // Ações
    handleKeyPress,
    startTest,
    restartTest,
    changeDifficulty,
    changeMode,
  };
}
