import React from 'react';
import './GameScreen.css';
import tvImage from '../Images/TV.png';
import { useGameEngine } from '../hooks/useGameEngine';

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
    isAnswerSelected
  } = useGameEngine();

  const currentQuestion = getCurrentQuestion();

  if (gameStatus === 'gameOver') {
    return (
      <div className="game-over">
        <div className="game-over-content">
          <h1>D'OH!</h1>
          <p>Game Over, {playerName}!</p>
          <p>You made it to the {currentLevel} level!</p>
          <p>Final Score: {totalScore}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      </div>
    );
  }

  if (gameStatus === 'won') {
    return (
      <div className="game-won">
        <div className="game-won-content">
          <h1>WOO HOO!</h1>
          <p>Congratulations, {playerName}!</p>
          <p>You've mastered all levels!</p>
          <p>Final Score: {totalScore}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-screen">
      <div className="question-container">
        <div className="question-text">
          {currentQuestion?.question}
        </div>
        <div className="options-container">
          {currentQuestion?.options.map((option, index) => (
            <div 
              key={index} 
              className={`option ${
                isAnswerSelected 
                  ? option === currentQuestion.correctAnswer 
                    ? 'correct'
                    : 'disabled'
                  : ''
              }`}
              onClick={() => !isAnswerSelected && handleAnswer(option)}
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

      <div className="score-display">
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