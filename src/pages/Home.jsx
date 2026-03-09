import { Link } from "react-router-dom";
import "./Home.css";

const CHALLENGES = [
  {
    slug: "typing-speed-test",
    title: "Typing Speed Test",
    emoji: "⌨️",
    difficulty: "Junior",
    description:
      "App de teste de digitação com WPM em tempo real, timer e personal best.",
  },
];

export default function Home() {
  return (
    <div className="home-wrapper">
      <header className="home-header">
        <h1 className="home-title">Frontend Mentor Challenges</h1>
        <p className="home-subtitle">
          Resoluções de desafios do Frontend Mentor construídas com React + Vite
        </p>
      </header>

      <main className="home-grid">
        {CHALLENGES.map((challenge) => (
          <Link
            key={challenge.slug}
            to={`/${challenge.slug}`}
            className="home-card"
          >
            <span className="home-card-emoji">{challenge.emoji}</span>
            <div className="home-card-content">
              <h2 className="home-card-title">{challenge.title}</h2>
              <p className="home-card-description">{challenge.description}</p>
              <span className="home-card-badge">{challenge.difficulty}</span>
            </div>
          </Link>
        ))}
      </main>

      <footer className="home-footer">
        <p>
          Feito por{" "}
          <a
            href="https://github.com/marcus"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marcus
          </a>
        </p>
      </footer>
    </div>
  );
}
