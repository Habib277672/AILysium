const revealed = new Set();

export const hasRevealed = (key) => revealed.has(key);
export const markRevealed = (key) => revealed.add(key);
