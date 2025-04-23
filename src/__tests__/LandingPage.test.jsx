import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import '@testing-library/jest-dom';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LandingPage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset mockNavigate
    mockNavigate.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    expect(screen.getByText("D'OH! TRIVIA")).toBeInTheDocument();
  });

  it('displays the donut images', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    const donutImages = screen.getAllByRole('img');
    expect(donutImages).toHaveLength(4); // 4 corner donuts
  });

  it('handles form submission with valid player name', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Enter Your Name');
    const button = screen.getByText('ENTER');

    // Enter a valid name
    fireEvent.change(input, { target: { value: 'Test Player' } });
    fireEvent.click(button);

    // Check if navigation was called with correct path and state
    expect(mockNavigate).toHaveBeenCalledWith('/game', {
      state: { playerName: 'Test Player' }
    });

    // Check if name was stored in localStorage
    expect(localStorage.getItem('playerName')).toBe('Test Player');
  });

  it('disables submit button when input is empty', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    const button = screen.getByText('ENTER');
    expect(button).toBeDisabled();

    // Enter some text
    const input = screen.getByPlaceholderText('Enter Your Name');
    fireEvent.change(input, { target: { value: 'Test' } });
    expect(button).not.toBeDisabled();

    // Clear the input
    fireEvent.change(input, { target: { value: '' } });
    expect(button).toBeDisabled();
  });

  it('trims whitespace from player name', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Enter Your Name');
    const button = screen.getByText('ENTER');

    // Enter name with whitespace
    fireEvent.change(input, { target: { value: '  Test Player  ' } });
    fireEvent.click(button);

    // Check if navigation was called with trimmed name
    expect(mockNavigate).toHaveBeenCalledWith('/game', {
      state: { playerName: 'Test Player' }
    });

    // Check if trimmed name was stored in localStorage
    expect(localStorage.getItem('playerName')).toBe('Test Player');
  });
}); 