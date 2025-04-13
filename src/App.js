import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import GameScreen from './components/GameScreen';
import { triviaQuestions } from './data/questions';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleGameStart = (name) => {
    setPlayerName(name);
    setGameStarted(true);
  };

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === triviaQuestions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <LandingPage onEnter={handleGameStart} />
      ) : (
        <GameScreen
          question={triviaQuestions[currentQuestionIndex].question}
          options={triviaQuestions[currentQuestionIndex].options}
          score={score}
          playerName={playerName}
          onAnswerClick={handleAnswer}
        />
      )}
    </div>
  );
};

export default App;
