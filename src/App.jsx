import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TypingSpeedTest from "./challenges/typing-speed-test/typing-speed-test";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/typing-speed-test" element={<TypingSpeedTest />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
