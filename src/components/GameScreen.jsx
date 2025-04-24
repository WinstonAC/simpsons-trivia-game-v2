import React, { useEffect, useRef, useState } from 'react';
import './GameScreen.css';
import { useGameEngine } from '../hooks/useGameEngine';
import useSoundEffects from '../hooks/useSoundEffects';
import Timer from './Timer';
import Tutorial from './Tutorial';
import HelpButton from './HelpButton';
import SoundControl from './SoundControl';
import { useNavigate, useLocation } from 'react-router-dom';
import GameOverScreen from './GameOverScreen';
import { soundManager } from '../utils/soundEffects';

const GameScreen = ({ playerName = 'Player', onGameOver = () => {}, onGameWon = () => {} }) => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentPlayerName, setCurrentPlayerName] = useState(playerName);
  const {
    currentLevel,
    correctAnswers,
    totalIncorrect,
    gameStatus,
    totalScore,
    getCurrentQuestion,
    handleAnswer,
    resetGame,
    isAnswerSelected,
    currentStreak,
    nextQuestion,
    currentQuestion,
    score,
    streak,
    progress,
    selectAnswer,
    isGameOver,
    timeLeft,
    setTimeLeft
  } = useGameEngine();

  const { playSound, toggleMute, isMuted } = useSoundEffects();
  const optionsRef = useRef([]);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Get player name from location state if available
  useEffect(() => {
    if (location.state?.playerName) {
      setCurrentPlayerName(location.state.playerName);
    }
  }, [location.state]);

  useEffect(() => {
    // Focus first option when question changes
    if (optionsRef.current[0] && !isAnswerSelected) {
      optionsRef.current[0].focus();
    }
  }, [currentQuestion, isAnswerSelected]);

  useEffect(() => {
    if (isAnswerSelected) {
      const timer = setTimeout(() => {
        nextQuestion();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAnswerSelected, nextQuestion]);

  useEffect(() => {
    if (isGameOver) {
      soundManager.play('gameOver');
      navigate('/game-over', { state: { score, playerName } });
    }
  }, [isGameOver, score, playerName, navigate]);

  const vibrate = (pattern) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const handleTimeUp = () => {
    if (!isAnswerSelected) {
      handleAnswer(null);
      playSound('incorrect');
    }
  };

  const handleAnswerSelection = (option) => {
    if (!isAnswerSelected) {
      handleAnswer(option);
      playSound(option === currentQuestion.correctAnswer ? 'correct' : 'incorrect');
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e, answer) => {
    if (e.changedTouches && e.changedTouches[0]) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX.current;
      const deltaY = touchEndY - touchStartY.current;

      if (Math.abs(deltaX) < 50 && Math.abs(deltaY) < 50) {
        handleAnswerSelection(answer);
      }
    }
  };

  const handleKeyDown = (e, option, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isAnswerSelected) {
        handleAnswerSelection(option);
      }
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % currentQuestion.options.length;
      optionsRef.current[nextIndex].focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + currentQuestion.options.length) % currentQuestion.options.length;
      optionsRef.current[prevIndex].focus();
    }
  };

  const handleExit = () => {
    navigate('/');
  };

  if (gameStatus !== 'playing') {
    return (
      <GameOverScreen
        score={totalScore}
        correctAnswers={correctAnswers}
        totalIncorrect={totalIncorrect}
        isWin={gameStatus === 'won'}
      />
    );
  }

  return (
    <div 
      className="game-screen" 
      role="main"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <HelpButton onClick={() => setShowTutorial(true)} />
      <SoundControl isMuted={isMuted} onToggle={toggleMute} />
      
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      
      <button 
        className="exit-button"
        onClick={handleExit}
        title="Exit Game"
      >
        ✕
      </button>
      
      <Timer 
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        initialTime={30}
      />
      
      <div className="game-info">
        <div className="difficulty-indicator" aria-label={`Level ${currentLevel}`}>
          Level {currentLevel}
        </div>
        <div className="progress-indicator" aria-label={`Progress: ${Math.round(progress)}%`}>
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="streak-counter" aria-label={`Current streak: ${currentStreak}`}>
          Streak: {currentStreak}
        </div>
      </div>

      <div className="question-container">
        <div className="question-text" aria-live="polite">
          {currentQuestion?.question}
        </div>
        <div className="options-container" role="radiogroup" aria-label="Answer options">
          {currentQuestion?.options.map((option, index) => (
            <div 
              key={index}
              ref={el => optionsRef.current[index] = el}
              className={`option ${
                isAnswerSelected 
                  ? option === currentQuestion.correctAnswer 
                    ? 'correct'
                    : 'disabled'
                  : ''
              }`}
              onClick={() => !isAnswerSelected && handleAnswerSelection(option)}
              onKeyDown={(e) => handleKeyDown(e, option, index)}
              role="radio"
              aria-checked={isAnswerSelected && option === currentQuestion.correctAnswer}
              tabIndex={0}
              aria-label={`Option ${index + 1}: ${option}`}
              style={{ 
                cursor: isAnswerSelected ? 'default' : 'pointer',
                opacity: isAnswerSelected && option !== currentQuestion.correctAnswer ? 0.5 : 1
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="score-display" aria-label={`Score: ${totalScore}, Incorrect Answers: ${totalIncorrect}`}>
        <div className="score-content">
          <div className="player-name">{currentPlayerName}</div>
          <div className="score-value">Score: {totalScore}</div>
          <div className="incorrect-count">Incorrect: {totalIncorrect}</div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen; 