import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GameOverScreen from '../components/GameOverScreen';
import '@testing-library/jest-dom';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('GameOverScreen', () => {
  beforeEach(() => {
    // Reset mockNavigate before each test
    mockNavigate.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <GameOverScreen score={100} playerName="Test Player" />
      </MemoryRouter>
    );
    expect(screen.getByText('GAME OVER')).toBeInTheDocument();
  });

  it('displays the correct score and player name', () => {
    render(
      <MemoryRouter>
        <GameOverScreen score={100} playerName="Test Player" />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Test Player')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('handles play again button click', () => {
    render(
      <MemoryRouter>
        <GameOverScreen score={100} playerName="Test Player" />
      </MemoryRouter>
    );

    const playAgainButton = screen.getByText('PLAY AGAIN');
    fireEvent.click(playAgainButton);

    expect(mockNavigate).toHaveBeenCalledWith('/game', {
      state: { playerName: 'Test Player' }
    });
  });

  it('handles return to home button click', () => {
    render(
      <MemoryRouter>
        <GameOverScreen score={100} playerName="Test Player" />
      </MemoryRouter>
    );

    const homeButton = screen.getByText('RETURN TO HOME');
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('displays high score message when appropriate', () => {
    // Mock localStorage
    const mockLocalStorage = {
      getItem: jest.fn().mockReturnValue('50'),
      setItem: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

    render(
      <MemoryRouter>
        <GameOverScreen score={100} playerName="Test Player" />
      </MemoryRouter>
    );

    expect(screen.getByText('NEW HIGH SCORE!')).toBeInTheDocument();
  });

  it('does not display high score message when score is lower', () => {
    // Mock localStorage
    const mockLocalStorage = {
      getItem: jest.fn().mockReturnValue('150'),
      setItem: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

    render(
      <MemoryRouter>
        <GameOverScreen score={100} playerName="Test Player" />
      </MemoryRouter>
    );

    expect(screen.queryByText('NEW HIGH SCORE!')).not.toBeInTheDocument();
  });
}); 