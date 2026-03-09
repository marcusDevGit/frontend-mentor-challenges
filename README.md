# Frontend Mentor Challenges

Resoluções de desafios do [Frontend Mentor](https://www.frontendmentor.io/), construídos com **React** e **Vite**.

## 🚀 Desafios

| Desafio              | Dificuldade | Rota                   | Link                                                                                     |
| :------------------- | :---------: | :--------------------- | :--------------------------------------------------------------------------------------- |
| ⌨️ Typing Speed Test |   Junior    | `/#/typing-speed-test` | [Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test-tK-z0Mba-R) |

## 🏗️ Arquitetura

Cada desafio segue a separação de responsabilidades adaptada do backend para o frontend:

| Backend       | Frontend (React)                      |
| :------------ | :------------------------------------ |
| Controllers   | Pages/Views (`typing-speed-test.jsx`) |
| Services      | Custom Hooks (`useTypingTest.js`)     |
| Utils/Helpers | Utils (`passages.js`)                 |
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

Acesse `http://localhost:5173/frontend-mentor-challenges/` para ver a página principal com os desafios.
