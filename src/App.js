import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import GameScreen from './components/GameScreen';
import { triviaQuestions } from './data/questions';

const App = () => {
  const [playerName, setPlayerName] = useState('');

  const handleGameStart = (name) => {
    setPlayerName(name);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<LandingPage onEnter={handleGameStart} />} 
          />
          <Route 
            path="/game" 
            element={
              playerName ? (
                <GameScreen 
                  playerName={playerName}
                  onGameOver={() => setPlayerName('')}
                  onGameWon={() => setPlayerName('')}
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
