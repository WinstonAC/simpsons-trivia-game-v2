import React from 'react';
import './TV.css';
import tvImage from '../Images/TV.png';
import { triviaQuestions } from '../data/questions';

const TV = ({ question, options, score, playerName, onAnswerClick }) => {
  return (
    <div className="game-container">
      <div className="question-container">
        <div className="question-text">
          {question}
        </div>
        <div className="options-container">
          {options.map((option, index) => (
            <div 
              key={index} 
              className="option"
              onClick={() => onAnswerClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="score-tv">
        <img src={tvImage} alt="Score Display" className="tv-frame" />
        <div className="score-screen">
          <div className="player-name">{playerName}</div>
          <div className="score-text">Score: {score}/5</div>
        </div>
      </div>
    </div>
  );
};

export default TV; 