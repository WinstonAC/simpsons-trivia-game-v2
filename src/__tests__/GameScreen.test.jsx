import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GameScreen from '../components/GameScreen';
import '@testing-library/jest-dom';

// Mock the useGameEngine hook
jest.mock('../hooks/useGameEngine', () => ({
  useGameEngine: () => ({
    currentQuestion: {
      question: "What is Homer's favorite food?",
      options: ['Donuts', 'Salad', 'Pizza', 'Tofu'],
      correctAnswer: 'Donuts'
    },
    score: 0,
    incorrectCount: 0,
    level: 1,
    streak: 0,
    progress: 0,
    selectAnswer: jest.fn().mockReturnValue(true),
    isGameOver: false,
    timeLeft: 30,
    setTimeLeft: jest.fn()
  })
}));

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock the soundManager
jest.mock('../utils/soundEffects', () => ({
  soundManager: {
    play: jest.fn(),
    toggleMute: jest.fn(),
    isMuted: false
  }
}));

// Mock HTMLMediaElement
window.HTMLMediaElement.prototype.play = () => Promise.resolve();
window.HTMLMediaElement.prototype.pause = () => {};

describe('GameScreen Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderGameScreen = () => {
    return render(
      <MemoryRouter>
        <GameScreen playerName="Test Player" />
      </MemoryRouter>
    );
  };

  it('renders without crashing', () => {
    renderGameScreen();
    expect(screen.getByText("What is Homer's favorite food?")).toBeInTheDocument();
  });

  it('displays player name and score', () => {
    renderGameScreen();
    expect(screen.getByText(/Test Player/)).toBeInTheDocument();
    expect(screen.getByText(/Score: 0/)).toBeInTheDocument();
  });

  it('displays level and streak information', () => {
    renderGameScreen();
    expect(screen.getByText(/Level 1/)).toBeInTheDocument();
    expect(screen.getByText(/Streak: 0/)).toBeInTheDocument();
  });

  it('handles correct answer selection', async () => {
    renderGameScreen();
    const correctOption = screen.getByText('Donuts');
    fireEvent.click(correctOption);
    
    await waitFor(() => {
      expect(correctOption).toHaveAttribute('aria-checked', 'false');
    });
  });

  it('handles incorrect answer selection', async () => {
    renderGameScreen();
    const incorrectOption = screen.getByText('Salad');
    fireEvent.click(incorrectOption);
    
    await waitFor(() => {
      expect(incorrectOption).toHaveAttribute('aria-checked', 'false');
    });
  });

  it('handles timer countdown', () => {
    renderGameScreen();
    const timerContainer = screen.getByRole('timer');
    expect(timerContainer).toHaveAttribute('aria-label', 'Time remaining: 30 seconds');
  });

  it('handles sound toggle', () => {
    renderGameScreen();
    const soundButton = screen.getByRole('button', { name: /Unmute sound/i });
    fireEvent.click(soundButton);
    expect(soundButton).toHaveAttribute('aria-label', 'Mute sound');
  });

  it('displays tutorial when help button is clicked', () => {
    renderGameScreen();
    const helpButton = screen.getByRole('button', { name: /Open Tutorial/i });
    fireEvent.click(helpButton);
    expect(screen.getByText('How to Play')).toBeInTheDocument();
  });

  it('handles mobile touch events', () => {
    renderGameScreen();
    const option = screen.getByText('Donuts');
    
    fireEvent.touchStart(option, {
      touches: [{ clientX: 0, clientY: 0 }]
    });
    
    fireEvent.touchEnd(option, {
      changedTouches: [{ clientX: 10, clientY: 10 }]
    });
  });

  it('has accessible elements', () => {
    renderGameScreen();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
  });

  it('handles exit button click', () => {
    renderGameScreen();
    const exitButton = screen.getByTitle('Exit Game');
    fireEvent.click(exitButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
}); 