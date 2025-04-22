import React, { useEffect, useRef, useState } from 'react';
import './GameScreen.css';
import { useGameEngine } from '../hooks/useGameEngine';
import useSoundEffects from '../hooks/useSoundEffects';
import Timer from './Timer';
import Tutorial from './Tutorial';
import HelpButton from './HelpButton';
import SoundControl from './SoundControl';
import { useNavigate } from 'react-router-dom';

const GameScreen = ({ playerName, onGameOver, onGameWon }) => {
  const [showTutorial, setShowTutorial] = useState(false);
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
    currentStreak
  } = useGameEngine();

  const { playSound, toggleMute, isMuted } = useSoundEffects();
  const currentQuestion = getCurrentQuestion();
  const progress = ((correctAnswers + totalIncorrect) / 10) * 100;
  const optionsRef = useRef([]);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus first option when question changes
    if (optionsRef.current[0] && !isAnswerSelected) {
      optionsRef.current[0].focus();
    }
  }, [currentQuestion, isAnswerSelected]);

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
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    vibrate(10);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      vibrate(30);
      if (deltaX > 0) {
        const currentIndex = optionsRef.current.findIndex(el => document.activeElement === el);
        if (currentIndex > 0) {
          optionsRef.current[currentIndex - 1].focus();
        }
      } else {
        const currentIndex = optionsRef.current.findIndex(el => document.activeElement === el);
        if (currentIndex < optionsRef.current.length - 1) {
          optionsRef.current[currentIndex + 1].focus();
        }
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

  if (gameStatus === 'gameOver') {
    playSound('gameOver');
    return (
      <div className="game-over" role="alert" aria-live="polite">
        <div className="game-over-content">
          <h1>D'OH!</h1>
          <p>Game Over, {playerName}!</p>
          <p>You made it to the {currentLevel} level!</p>
          <p>Final Score: {totalScore}</p>
          <p>Correct Answers: {correctAnswers}</p>
          <p>Incorrect Answers: {totalIncorrect}</p>
          <p>Longest Streak: {currentStreak}</p>
          <button 
            onClick={resetGame}
            aria-label="Play Again"
            className="reset-button"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  if (gameStatus === 'won') {
    playSound('victory');
    return (
      <div className="game-won" role="alert" aria-live="polite">
        <div className="game-won-content">
          <h1>WOO HOO!</h1>
          <p>Congratulations, {playerName}!</p>
          <p>You've mastered all levels!</p>
          <p>Final Score: {totalScore}</p>
          <p>Correct Answers: {correctAnswers}</p>
          <p>Incorrect Answers: {totalIncorrect}</p>
          <p>Longest Streak: {currentStreak}</p>
          <button 
            onClick={resetGame}
            aria-label="Play Again"
            className="reset-button"
          >
            Play Again
          </button>
        </div>
      </div>
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
        onClick={() => navigate('/')}
        title="Exit Game"
      >
        ✕
      </button>
      
      <Timer 
        initialTime={30}
        onTimeUp={handleTimeUp}
        isActive={!isAnswerSelected}
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
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="score-display" aria-label={`Score: ${totalScore}`}>
        <div className="score-content">
          <div className="player-name">{playerName}</div>
          <div className="score-value">Score: {totalScore}</div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen; 