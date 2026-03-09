# ⌨️ Typing Speed Test

Desafio nível **Junior** do [Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test-tK-z0Mba-R).

## Funcionalidades

- Digitação com feedback visual (verde/vermelho/cursor piscante)
- WPM e Accuracy em tempo real
- Dois modos: Timed (60s) e Passage (sem limite)
- Três dificuldades: Easy, Medium, Hard (30 passagens)
- Personal Best salvo no localStorage
- Tela de resultados: Baseline Established, High Score Smashed!, Test Complete
- Responsivo: Mobile (375px), Tablet (768px), Desktop (1440px)

## Tecnologias

- React + Vite
- CSS puro (Mobile-first)
- Custom Hook (`useTypingTest`)

## Arquitetura

```
typing-speed-test/
├── hooks/
│   └── useTypingTest.js       ← Lógica de negócio (timer, WPM, accuracy)
├── utils/
│   └── passages.js            ← Carregar e sortear passagens do data.json
├── components/
│   ├── Header.jsx             ← Logo responsivo + Personal Best
│   ├── StatsRow.jsx           ← WPM, Accuracy, Time
│   ├── SettingsBar.jsx        ← Difficulty + Mode
│   ├── PassageArea.jsx        ← Texto com feedback visual
│   ├── Footer.jsx             ← Botão Restart
│   └── ResultsModal.jsx       ← Modal de resultados
├── typing-speed-test.jsx      ← Componente principal
├── typing-speed-test.css      ← Layout responsivo
└── data.json                  ← 30 passagens (10 por dificuldade)
```

## Aprendizados

- Custom Hooks como equivalente a Services do backend
- `useMemo` para valores derivados (sem re-renders extras)
- `useRef` para valores que persistem sem causar re-render
- `localStorage` como sistema externo sincronizado via `useEffect`
- `:focus-visible` para acessibilidade sem poluir UX
