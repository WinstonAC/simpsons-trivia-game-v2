import React, { useEffect, useState } from 'react';
import './Timer.css';

const Timer = ({ initialTime = 30, onTimeUp, isActive = true, key }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, isActive]);

  // Reset timer when key changes
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [key, initialTime]);

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