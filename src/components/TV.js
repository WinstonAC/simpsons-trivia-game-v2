import React from 'react';
import './TV.css';
import tvImage from '../Images/Simpsons_TV1.png';  // Updated to new TV image

const TV = ({ question, options, onAnswerClick }) => {
  // Determine question length class
  const getQuestionClass = (text) => {
    if (text.length > 50) return 'question-text long';
    if (text.length < 20) return 'question-text short';
    return 'question-text';
  };

  return (
    <div className="tv-container">
      <img src={tvImage} alt="Simpsons TV" className="tv-frame" />
      <div className="tv-screen">
        <div className={getQuestionClass(question)}>
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
    </div>
  );
};

export default TV;