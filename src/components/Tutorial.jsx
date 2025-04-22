import React, { useState } from 'react';
import './Tutorial.css';

const Tutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Springfield Trivia!",
      content: "D'oh! Ready to test your Simpsons knowledge? Let's guide you through the basics!"
    },
    {
      title: "Answer Questions",
      content: "You have 30 seconds to answer each question. Choose wisely, or you'll be saying 'D'oh!'"
    },
    {
      title: "Build Your Streak",
      content: "Answer correctly to build your streak. The longer your streak, the more points you'll earn!"
    },
    {
      title: "Level Up",
      content: "Progress through levels to face harder questions. Even Comic Book Guy would be impressed!"
    },
    {
      title: "Controls",
      content: "Use keyboard arrows or swipe on mobile to navigate. Press Enter or tap to select answers."
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-content">
        <button className="tutorial-close" onClick={onClose}>×</button>
        
        <div className="tutorial-step">
          <h2>{tutorialSteps[currentStep].title}</h2>
          <p>{tutorialSteps[currentStep].content}</p>
        </div>

        <div className="tutorial-navigation">
          <button 
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="tutorial-nav-button"
          >
            Previous
          </button>
          <div className="tutorial-dots">
            {tutorialSteps.map((_, index) => (
              <span 
                key={index}
                className={`tutorial-dot ${index === currentStep ? 'active' : ''}`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
          <button 
            onClick={handleNext}
            className="tutorial-nav-button"
          >
            {currentStep === tutorialSteps.length - 1 ? 'Start Playing' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial; 