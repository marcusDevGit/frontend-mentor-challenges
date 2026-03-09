import data from "../data.json";

/**
 * @param {"easy" | "medium" | "hard"} difficulty
 * @returns {Array<{id: string, text: string}>}
 */

export function getPassagesByDificulty(difficulty) {
  const passages = data[difficulty];

  if (!passages) {
    console.log(`Dificuldade "${difficulty}" não encontrada. Usando "easy"`);
    return data.easy;
  }
  return passages;
}

/**
 * @param {"easy" | "medium" | "hard"} difficulty
 * @returns {{id: string, text: string}}
 */
export function getRandomPassage(difficulty) {
  const passages = getPassagesByDificulty(difficulty);

  const randomIndex = Math.floor(Math.random() * passages.length);
  return passages[randomIndex];
}
