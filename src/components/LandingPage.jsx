import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import donutImage from '../Images/doughnut.png';
import './LandingPage.css';

const LandingPage = ({ onEnter }) => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    try {
      // Store the player name in localStorage
      localStorage.setItem('playerName', playerName.trim());
      // Navigate to the game page
      navigate('/game');
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div className="landing-container">
      {/* Corner Donuts */}
      <div className="corner-donut top-left">
        <img src={donutImage} alt="" />
      </div>
      <div className="corner-donut top-right">
        <img src={donutImage} alt="" />
      </div>
      <div className="corner-donut bottom-left">
        <img src={donutImage} alt="" />
      </div>
      <div className="corner-donut bottom-right">
        <img src={donutImage} alt="" />
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
