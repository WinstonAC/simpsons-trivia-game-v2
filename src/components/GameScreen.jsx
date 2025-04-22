import React, { useEffect, useRef, useState } from 'react';
import './GameScreen.css';
import tvImage from '../Images/TV.png';
import { useGameEngine } from '../hooks/useGameEngine';
import Timer from './Timer';

const GameScreen = ({ playerName }) => {
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

  const currentQuestion = getCurrentQuestion();
  const progress = ((correctAnswers + totalIncorrect) / 10) * 100;
  const optionsRef = useRef([]);

  useEffect(() => {
    // Focus first option when question changes
    if (optionsRef.current[0] && !isAnswerSelected) {
      optionsRef.current[0].focus();
    }
  }, [currentQuestion, isAnswerSelected]);

  const handleTimeUp = () => {
    if (!isAnswerSelected) {
      handleAnswer(null);
    }
  };

  const handleKeyDown = (e, option, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isAnswerSelected) {
        handleAnswer(option);
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
    <div className="game-screen" role="main">
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
              onClick={() => !isAnswerSelected && handleAnswer(option)}
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
        <img src={tvImage} alt="Score Display" className="score-tv-frame" />
        <div className="score-content">
          <div className="score-inner">
            <div className="player-name">{playerName}</div>
            <div className="score-value">Score: {totalScore}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen; 