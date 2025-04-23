export const calculateScore = ({ isCorrect, timeRemaining, streak, level }) => {
  if (!isCorrect) return 0;
  
  const baseScore = 100;
  const timeBonus = Math.floor(timeRemaining / 2);
  const streakMultiplier = Math.min(streak, 10);
  const levelMultiplier = getLevelMultiplier(level);
  
  return (baseScore + timeBonus) * streakMultiplier * levelMultiplier;
};

export const updateStreak = (currentStreak, isCorrect) => {
  if (!isCorrect) return 0;
  return Math.min(currentStreak + 1, 10);
};

export const getLevelMultiplier = (level) => {
  return Math.min(level, 5);
}; 