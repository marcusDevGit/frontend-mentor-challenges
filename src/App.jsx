import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TypingSpeedTest from "./challenges/typing-speed-test/typing-speed-test";
import WeatherApp from "./challenges/weather-app/weather-app";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/typing-speed-test" element={<TypingSpeedTest />} />
        <Route path="/weather-app" element={<WeatherApp />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
