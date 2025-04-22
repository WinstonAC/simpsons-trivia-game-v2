import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GameScreen from '../components/GameScreen';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock useGameEngine hook
jest.mock('../hooks/useGameEngine', () => ({
  useGameEngine: () => ({
    currentLevel: 1,
    correctAnswers: 0,
    totalIncorrect: 0,
    gameStatus: 'playing',
    totalScore: 0,
    getCurrentQuestion: () => ({
      question: 'Test Question',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 'Option 1'
    }),
    handleAnswer: jest.fn(),
    resetGame: jest.fn(),
    isAnswerSelected: false,
    currentStreak: 0
  })
}));

const renderGameScreen = (props = {}) => {
  return render(
    <BrowserRouter>
      <GameScreen playerName="Test Player" {...props} />
    </BrowserRouter>
  );
};

describe('GameScreen Component', () => {
  test('renders game screen with question and options', () => {
    renderGameScreen();
    
    expect(screen.getByText('Test Question')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.getByText('Option 4')).toBeInTheDocument();
  });

  test('displays player name and score', () => {
    renderGameScreen();
    
    expect(screen.getByText('Test Player')).toBeInTheDocument();
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });

  test('shows current level and streak', () => {
    renderGameScreen();
    
    expect(screen.getByText('Level 1')).toBeInTheDocument();
    expect(screen.getByText('Streak: 0')).toBeInTheDocument();
  });

  test('handles option selection', () => {
    renderGameScreen();
    
    const option = screen.getByText('Option 1');
    fireEvent.click(option);
    
    // Add assertions based on your game logic
  });

  test('has accessible elements', () => {
    renderGameScreen();
    
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
  });
}); 