import { useState, useEffect, useRef } from 'react';
import { triviaQuestions } from '../data/triviaQuestions';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useGameEngine = () => {
  const [currentLevel, setCurrentLevel] = useState('easy');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalIncorrect, setTotalIncorrect] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'gameOver', 'won'
  const [totalScore, setTotalScore] = useState(0);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  // Audio refs
  const correctSound = useRef(new Audio('/src/assets/sounds/cowabunga.mp3'));
  const incorrectSound = useRef(new Audio('/src/assets/sounds/doh.mp3'));

  // Initialize and shuffle questions for each level
  useEffect(() => {
    const questions = shuffleArray(triviaQuestions[currentLevel]);
    setCurrentQuestions(questions);
    setCurrentQuestionIndex(0);
  }, [currentLevel]);

  // Reset sounds when component unmounts
  useEffect(() => {
    return () => {
      correctSound.current.pause();
      incorrectSound.current.pause();
      correctSound.current.currentTime = 0;
      incorrectSound.current.currentTime = 0;
    };
  }, []);

  const handleAnswer = async (selectedAnswer) => {
    if (gameStatus !== 'playing' || isAnswerSelected) return;

    setIsAnswerSelected(true);
    const isCorrect = selectedAnswer === currentQuestions[currentQuestionIndex].correctAnswer;

    // Play sound effect
    try {
      if (isCorrect) {
        correctSound.current.currentTime = 0;
        await correctSound.current.play();
      } else {
        incorrectSound.current.currentTime = 0;
        await incorrectSound.current.play();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setTotalScore(prev => prev + 1);
    } else {
      setTotalIncorrect(prev => prev + 1);
    }

    // Check game over condition
    if (!isCorrect && totalIncorrect + 1 >= 5) {
      setGameStatus('gameOver');
      return;
    }

    // Check level progression
    if (isCorrect && correctAnswers + 1 >= 5) {
      if (currentLevel === 'easy') {
        setTimeout(() => {
          setCurrentLevel('medium');
          setCorrectAnswers(0);
          setIsAnswerSelected(false);
        }, 1000);
      } else if (currentLevel === 'medium') {
        setTimeout(() => {
          setCurrentLevel('hard');
          setCorrectAnswers(0);
          setIsAnswerSelected(false);
        }, 1000);
      } else if (currentLevel === 'hard') {
        setGameStatus('won');
      }
    } else {
      // Move to next question after a delay
      setTimeout(() => {
        setCurrentQuestionIndex(prev => (prev + 1) % currentQuestions.length);
        setIsAnswerSelected(false);
      }, 1000);
    }
  };

  const getCurrentQuestion = () => {
    const question = currentQuestions[currentQuestionIndex];
    if (!question) return null;
    
    // Shuffle options but keep track of the correct answer
    const correctAnswer = question.correctAnswer;
    const shuffledOptions = shuffleArray([...question.options]);
    
    return {
      ...question,
      options: shuffledOptions,
      correctAnswer // Keep the original correct answer
    };
  };

  const resetGame = () => {
    setCurrentLevel('easy');
    setCorrectAnswers(0);
    setTotalIncorrect(0);
    setCurrentQuestionIndex(0);
    setGameStatus('playing');
    setTotalScore(0);
  };

  return {
    currentLevel,
    correctAnswers,
    totalIncorrect,
    gameStatus,
    totalScore,
    getCurrentQuestion,
    handleAnswer,
    resetGame,
    isAnswerSelected
  };
}; 