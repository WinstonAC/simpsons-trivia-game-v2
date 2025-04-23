import { calculateScore, updateStreak, getLevelMultiplier } from '../utils/scoring';

describe('Scoring System', () => {
  describe('calculateScore', () => {
    test('calculates base score correctly', () => {
      const baseScore = calculateScore({
        isCorrect: true,
        timeRemaining: 10,
        streak: 1,
        level: 1
      });
      expect(baseScore).toBe(105); // Base score (100) + time bonus (5)
    });

    test('returns 0 for incorrect answer', () => {
      const score = calculateScore({
        isCorrect: false,
        timeRemaining: 10,
        streak: 3,
        level: 1
      });
      expect(score).toBe(0);
    });

    test('applies streak multiplier', () => {
      const score = calculateScore({
        isCorrect: true,
        timeRemaining: 10,
        streak: 3,
        level: 1
      });
      expect(score).toBe(315); // (Base score (100) + time bonus (5)) * streak (3)
    });

    test('applies level multiplier', () => {
      const score = calculateScore({
        isCorrect: true,
        timeRemaining: 10,
        streak: 1,
        level: 3
      });
      expect(score).toBe(315); // (Base score (100) + time bonus (5)) * level (3)
    });

    test('applies time bonus', () => {
      const score = calculateScore({
        isCorrect: true,
        timeRemaining: 20,
        streak: 1,
        level: 1
      });
      expect(score).toBe(110); // Base score (100) + time bonus (10)
    });
  });

  describe('updateStreak', () => {
    test('increments streak for correct answer', () => {
      const newStreak = updateStreak(2, true);
      expect(newStreak).toBe(3);
    });

    test('resets streak for incorrect answer', () => {
      const newStreak = updateStreak(5, false);
      expect(newStreak).toBe(0);
    });

    test('handles maximum streak', () => {
      const newStreak = updateStreak(10, true);
      expect(newStreak).toBe(10);
    });
  });

  describe('getLevelMultiplier', () => {
    test('returns correct multiplier for each level', () => {
      expect(getLevelMultiplier(1)).toBe(1);
      expect(getLevelMultiplier(2)).toBe(2);
      expect(getLevelMultiplier(3)).toBe(3);
      expect(getLevelMultiplier(4)).toBe(4);
      expect(getLevelMultiplier(5)).toBe(5);
    });

    test('handles level beyond maximum', () => {
      expect(getLevelMultiplier(6)).toBe(5);
    });
  });
}); 