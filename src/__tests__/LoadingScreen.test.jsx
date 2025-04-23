import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingScreen from '../components/LoadingScreen';
import '@testing-library/jest-dom';

describe('LoadingScreen', () => {
  it('renders without crashing', () => {
    render(<LoadingScreen />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays the loading animation', () => {
    render(<LoadingScreen />);
    const loadingElement = screen.getByTestId('loading-animation');
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveClass('loading-animation');
  });

  it('has proper accessibility attributes', () => {
    render(<LoadingScreen />);
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toHaveAttribute('aria-live', 'polite');
  });

  it('has the correct styling classes', () => {
    render(<LoadingScreen />);
    const container = screen.getByTestId('loading-container');
    expect(container).toHaveClass('loading-screen');
  });
}); 