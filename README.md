# Frontend Mentor Challenges

Resoluções de desafios do [Frontend Mentor](https://www.frontendmentor.io/), construídos com **React** e **Vite**.

🔗 **Live Site**: [marcusdevgit.github.io/frontend-mentor-challenges](https://marcusdevgit.github.io/frontend-mentor-challenges/)

## 🚀 Desafios

| Desafio              | Dificuldade | Live                                                                                         | Link                                                                          |
| :------------------- | :---------: | :------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| ⌨️ Typing Speed Test |   Junior    | [Ver desafio](https://marcusdevgit.github.io/frontend-mentor-challenges/#/typing-speed-test) | [Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test) |
| 🌤️ Weather App       |   Intermediate    | [Ver desafio](https://marcusdevgit.github.io/frontend-mentor-challenges/#/weather-app)       | [Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49)       |

## 🏗️ Arquitetura

Cada desafio segue a separação de responsabilidades adaptada do backend para o frontend:

| Backend       | Frontend (React)                      |
| :------------ | :------------------------------------ |
| Controllers   | Pages/Views (`typing-speed-test.jsx`, `weather-app.jsx`) |
| Services      | Custom Hooks (`useTypingTest.js`, `useWeather.js`)       |
| Utils/Helpers | Utils (`passages.js`, `weatherCodes.js`)                 |
| Repository    | `localStorage` / APIs                 |

## 📐 Design

Todos os desafios são construídos na ordem **Mobile-First**:

1. Mobile (375px)
2. Tablet (768px)
3. Desktop (1440px)

## 💻 Como Rodar

```bash
git clone https://github.com/marcusDevGit/frontend-mentor-challenges.git
cd frontend-mentor-challenges
npm install
npm run dev
```

Acesse `http://localhost:5173/frontend-mentor-challenges/` para ver a página principal.
