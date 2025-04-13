import React, { useState } from 'react';
import './App.css';
import TV from './components/TV';
import LandingPage from './components/LandingPage';

const triviaQuestions = [
  {
    question: "What is Homer's favorite beer?",
    options: ["Duff", "Buzz Cola", "Flaming Moe's", "Fudd"],
    correctAnswer: "Duff"
  },
  {
    question: "What is the name of Bart's best friend?",
    options: ["Milhouse", "Nelson", "Martin", "Ralph"],
    correctAnswer: "Milhouse"
  }
];

function App() {
  const [playerName, setPlayerName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const handleEnter = (name) => {
    setPlayerName(name);
    setGameStarted(true);
  };

  const handleAnswer = (selectedOption) => {
    const currentQuestion = triviaQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    // Play sound (we'll add this next)
    // const sound = new Audio(isCorrect ? cowabungaSound : dohSound);
    // sound.play().catch(error => console.log('Error playing sound:', error));

    if (isCorrect) {
      setScore(score + 1);
    }

    setCurrentQuestionIndex((prevIndex) => 
      (prevIndex + 1) % triviaQuestions.length
    );
  };

  if (!gameStarted) {
    return <LandingPage onEnter={handleEnter} />;
  }

  const currentQuestion = triviaQuestions[currentQuestionIndex];

  return (
    <div className="app-container">
      <div className="game-content">
        <div className="score-display">Score: {score}</div>
        <TV 
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswerClick={handleAnswer}
        />
      </div>
    </div>
  );
}

export default App;
