import { ResultsModal } from "./components/ResultsModal";
import "./typing-speed-test.css";
import { Header } from "./components/Header";
import { StatsRow } from "./components/StatsRow";
import { SettingsBar } from "./components/SettingsBar";
import { PassageArea } from "./components/PassageArea";
import { Footer } from "./components/Footer";
import { useTypingTest } from "./hooks/useTypingTest";

function TypingSpeedTest() {
  const {
    status,
    passage,
    difficulty,
    mode,
    currentIndex,
    errors,
    wpm,
    accuracy,
    time,
    finalWpm,
    finalAccuracy,
    totalErrors,
    correctChars,
    resultType,
    personalBest,
    handleKeyPress,
    startTest,
    restartTest,
    changeDifficulty,
    changeMode,
  } = useTypingTest();
  return (
    <div className="tst-wrapper">
      <div className="tst-container">
        <Header personalBest={personalBest} />

        <main className="tst-main">
          <div className="tst-stats-container">
            <StatsRow wpm={wpm} accuracy={accuracy} time={time} />
            <SettingsBar
              difficulty={difficulty}
              mode={mode}
              onChangeDifficulty={changeDifficulty}
              onChangeMode={changeMode}
            />
          </div>

          <PassageArea
            passage={passage}
            currentIndex={currentIndex}
            errors={errors}
            status={status}
            onKeyPress={handleKeyPress}
            onStart={startTest}
          />
        </main>

        <Footer onRestart={restartTest} />
      </div>
      {status === "finished" && (
        <ResultsModal
          finalWpm={finalWpm}
          finalAccuracy={finalAccuracy}
          totalErrors={totalErrors}
          correctChars={correctChars}
          resultType={resultType}
          onRestart={restartTest}
        />
      )}
    </div>
  );
}

export default TypingSpeedTest;
