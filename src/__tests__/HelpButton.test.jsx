import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HelpButton from '../components/HelpButton';
import '@testing-library/jest-dom';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('HelpButton', () => {
  beforeEach(() => {
    // Reset mockNavigate before each test
    mockNavigate.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <HelpButton />
      </MemoryRouter>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <MemoryRouter>
        <HelpButton />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Help');
  });

  it('navigates to tutorial page when clicked', () => {
    render(
      <MemoryRouter>
        <HelpButton />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/tutorial');
  });

  it('has the correct icon', () => {
    render(
      <MemoryRouter>
        <HelpButton />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('help-button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });
}); 