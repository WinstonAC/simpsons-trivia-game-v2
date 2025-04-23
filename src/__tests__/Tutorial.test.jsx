import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Tutorial from '../components/Tutorial';
import '@testing-library/jest-dom';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Tutorial', () => {
  beforeEach(() => {
    // Reset mockNavigate before each test
    mockNavigate.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Tutorial />
      </MemoryRouter>
    );
    expect(screen.getByText('HOW TO PLAY')).toBeInTheDocument();
  });

  it('displays all tutorial sections', () => {
    render(
      <MemoryRouter>
        <Tutorial />
      </MemoryRouter>
    );

    expect(screen.getByText('Objective')).toBeInTheDocument();
    expect(screen.getByText('Gameplay')).toBeInTheDocument();
    expect(screen.getByText('Scoring')).toBeInTheDocument();
    expect(screen.getByText('Tips')).toBeInTheDocument();
  });

  it('handles return to home button click', () => {
    render(
      <MemoryRouter>
        <Tutorial />
      </MemoryRouter>
    );

    const homeButton = screen.getByText('RETURN TO HOME');
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('displays all tutorial content sections', () => {
    render(
      <MemoryRouter>
        <Tutorial />
      </MemoryRouter>
    );

    // Check for key content in each section
    expect(screen.getByText(/answer trivia questions/i)).toBeInTheDocument();
    expect(screen.getByText(/multiple choice/i)).toBeInTheDocument();
    expect(screen.getByText(/points for correct answers/i)).toBeInTheDocument();
    expect(screen.getByText(/read questions carefully/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <MemoryRouter>
        <Tutorial />
      </MemoryRouter>
    );

    const homeButton = screen.getByText('RETURN TO HOME');
    expect(homeButton).toHaveAttribute('aria-label', 'Return to home page');
  });
}); 