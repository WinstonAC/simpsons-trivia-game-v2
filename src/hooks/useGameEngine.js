import { useState, useEffect, useCallback } from 'react';
import { getRandomQuestion, getQuestionsByDifficulty } from '../data/questions';

const INITIAL_STATE = {
  currentLevel: 1,
  currentQuestion: null,
  correctAnswers: 0,
  totalIncorrect: 0,
  gameStatus: 'playing', // 'playing', 'gameOver', 'won'
  totalScore: 0,
  currentStreak: 0,
  isAnswerSelected: false,
  usedQuestions: new Set()
};

const SCORING = {
  easy: 100,
  medium: 200,
  hard: 300,
  streakMultiplier: 1.5
};

const LEVEL_THRESHOLDS = {
  easy: 5,
  medium: 10,
  hard: 15
};

export const useGameEngine = () => {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [difficulty, setDifficulty] = useState('easy');

  const getDifficultyForLevel = useCallback((level) => {
    if (level <= LEVEL_THRESHOLDS.easy) return 'easy';
    if (level <= LEVEL_THRESHOLDS.medium) return 'medium';
    return 'hard';
  }, []);

  const calculateScore = useCallback((baseScore, streak) => {
    return Math.floor(baseScore * (1 + (streak * 0.1)));
  }, []);

  const getNextQuestion = useCallback(() => {
    const availableQuestions = getQuestionsByDifficulty(difficulty);
    const unusedQuestions = availableQuestions.filter(
      q => !gameState.usedQuestions.has(q.question)
    );

    if (unusedQuestions.length === 0) {
      // Reset used questions if we've used them all
      setGameState(prev => ({
        ...prev,
        usedQuestions: new Set()
      }));
      return getRandomQuestion(difficulty);
    }

    const question = unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
    setGameState(prev => ({
      ...prev,
      usedQuestions: new Set([...prev.usedQuestions, question.question])
    }));
    return question;
  }, [difficulty, gameState.usedQuestions]);

  const handleAnswer = useCallback((selectedAnswer) => {
    if (gameState.isAnswerSelected) return;

    const isCorrect = selectedAnswer === gameState.currentQuestion.correctAnswer;
    const newStreak = isCorrect ? gameState.currentStreak + 1 : 0;
    const baseScore = SCORING[difficulty];
    const scoreToAdd = isCorrect ? calculateScore(baseScore, newStreak) : 0;

    setGameState(prev => ({
      ...prev,
      isAnswerSelected: true,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      totalIncorrect: isCorrect ? prev.totalIncorrect : prev.totalIncorrect + 1,
      totalScore: prev.totalScore + scoreToAdd,
      currentStreak: newStreak
    }));

    // Check if game is won
    if (gameState.currentLevel >= LEVEL_THRESHOLDS.hard) {
      setGameState(prev => ({
        ...prev,
        gameStatus: 'won'
      }));
    }
  }, [gameState.currentQuestion, gameState.isAnswerSelected, gameState.currentStreak, gameState.currentLevel, difficulty, calculateScore]);

  const nextQuestion = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;

    const newLevel = gameState.currentLevel + 1;
    const newDifficulty = getDifficultyForLevel(newLevel);
    
    setDifficulty(newDifficulty);
    setGameState(prev => ({
      ...prev,
      currentLevel: newLevel,
      currentQuestion: getNextQuestion(),
      isAnswerSelected: false
    }));
  }, [gameState.gameStatus, gameState.currentLevel, getDifficultyForLevel, getNextQuestion]);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
    setDifficulty('easy');
  }, []);

  // Initialize first question
  useEffect(() => {
    if (!gameState.currentQuestion && gameState.gameStatus === 'playing') {
      setGameState(prev => ({
        ...prev,
        currentQuestion: getNextQuestion()
      }));
    }
  }, [gameState.currentQuestion, gameState.gameStatus, getNextQuestion]);

  return {
    ...gameState,
    difficulty,
    handleAnswer,
    nextQuestion,
    resetGame,
    getCurrentQuestion: () => gameState.currentQuestion
  };
}; 