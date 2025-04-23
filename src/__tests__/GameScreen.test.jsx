import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import GameScreen from '../components/GameScreen';
import '@testing-library/jest-dom';

// Mock the sound effects
jest.mock('../assets/sounds', () => ({
  correctSound: jest.fn(),
  incorrectSound: jest.fn(),
  levelUpSound: jest.fn(),
  gameOverSound: jest.fn(),
}));

// Mock HTMLMediaElement
window.HTMLMediaElement.prototype.play = () => Promise.resolve();
window.HTMLMediaElement.prototype.pause = () => {};

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
      question: "What is Homer's favorite food?",
      options: ["Donuts", "Salad", "Pizza", "Tofu"],
      correctAnswer: "Donuts",
      difficulty: "easy"
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
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('renders game screen with initial state', () => {
    renderGameScreen();
    
    expect(screen.getByText("What is Homer's favorite food?")).toBeInTheDocument();
    expect(screen.getByText('Donuts')).toBeInTheDocument();
    expect(screen.getByText('Salad')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Tofu')).toBeInTheDocument();
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });

  test('displays player name and game info', () => {
    renderGameScreen();
    
    expect(screen.getByText('Test Player')).toBeInTheDocument();
    expect(screen.getByText('Level 1')).toBeInTheDocument();
    expect(screen.getByText('Streak: 0')).toBeInTheDocument();
  });

  test('handles correct answer selection', async () => {
    renderGameScreen();
    
    const correctOption = screen.getByText('Donuts');
    await act(async () => {
      fireEvent.click(correctOption);
    });
    
    await waitFor(() => {
      expect(correctOption).toHaveClass('correct');
    });
  });

  test('handles incorrect answer selection', async () => {
    renderGameScreen();
    
    const incorrectOption = screen.getByText('Salad');
    await act(async () => {
      fireEvent.click(incorrectOption);
    });
    
    await waitFor(() => {
      expect(incorrectOption).toHaveClass('disabled');
    });
  });

  test('handles timer countdown', () => {
    renderGameScreen();
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    
    expect(screen.getByText(/Time: \d+/)).toBeInTheDocument();
  });

  test('handles sound toggle', () => {
    renderGameScreen();
    
    const soundButton = screen.getByRole('button', { name: /sound/i });
    fireEvent.click(soundButton);
    
    expect(soundButton).toHaveAttribute('aria-label', 'Sound Off');
  });

  test('displays tutorial when help button is clicked', () => {
    renderGameScreen();
    
    const helpButton = screen.getByRole('button', { name: /help/i });
    fireEvent.click(helpButton);
    
    expect(screen.getByText(/tutorial/i)).toBeInTheDocument();
  });

  test('handles mobile touch events', () => {
    renderGameScreen();
    
    const option = screen.getByText('Donuts');
    fireEvent.touchStart(option);
    fireEvent.touchEnd(option);
    
    expect(option).toHaveClass('selected');
  });

  test('has accessible elements', () => {
    renderGameScreen();
    
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
  });
}); 