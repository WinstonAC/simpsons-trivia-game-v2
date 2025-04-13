import React, { useState } from 'react';
import './LandingPage.css';

const LandingPage = ({ onEnter }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      onEnter(playerName.trim());
    }
  };

  return (
    <div className="landing-container">
      <div className="smoke-stacks">
        {/* Left smoke stack */}
        <div className="smoke-left">
          <div className="smoke-particle"></div>
          <div className="smoke-particle"></div>
          <div className="smoke-particle"></div>
          <div className="smoke-particle"></div>
        </div>
        {/* Right smoke stack */}
        <div className="smoke-right">
          <div className="smoke-particle"></div>
          <div className="smoke-particle"></div>
          <div className="smoke-particle"></div>
          <div className="smoke-particle"></div>
        </div>
      </div>

      <div className="content-container">
        <h1 className="title">D'OH! TRIVIA</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="name-input"
            placeholder="Enter Your Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={20}
          />
          <button 
            type="submit" 
            className="enter-button"
            disabled={!playerName.trim()}
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage; 