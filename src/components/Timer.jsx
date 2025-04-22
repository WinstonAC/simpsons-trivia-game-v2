import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ initialTime = 30, onTimeUp, isActive = true }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onTimeUp();
    }
    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeUp]);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  const getTimeColor = () => {
    if (timeLeft <= 5) return '#ff0000';
    if (timeLeft <= 10) return '#ff9900';
    return '#00ff00';
  };

  return (
    <div 
      className="timer-container"
      role="timer"
      aria-label={`Time remaining: ${timeLeft} seconds`}
    >
      <div 
        className="timer-circle"
        style={{
          '--time-left': timeLeft,
          '--initial-time': initialTime,
          '--timer-color': getTimeColor()
        }}
      >
        <span className="timer-text">{timeLeft}</span>
      </div>
    </div>
  );
};

export default Timer; 