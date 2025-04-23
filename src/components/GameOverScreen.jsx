import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/GameOverScreen.css';

const GameOverScreen = ({ score, correctAnswers, totalIncorrect, isWin }) => {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    navigate('/game');
  };

  const handleMainMenu = () => {
    navigate('/');
  };

  return (
    <div className="game-over-screen">
      <div className="game-over-content">
        <h1>{isWin ? 'Congratulations!' : 'Game Over'}</h1>
        <div className="stats-container">
          <div className="stat">
            <span className="stat-label">Final Score:</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Correct Answers:</span>
            <span className="stat-value">{correctAnswers}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Incorrect Answers:</span>
            <span className="stat-value">{totalIncorrect}</span>
          </div>
        </div>
        <div className="button-container">
          <button 
            className="play-again-button"
            onClick={handlePlayAgain}
          >
            Play Again
          </button>
          <button 
            className="main-menu-button"
            onClick={handleMainMenu}
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen; 