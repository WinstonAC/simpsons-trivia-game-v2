import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Timer from '../components/Timer';

describe('Timer Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  test('renders with initial time', () => {
    const onTimeUp = jest.fn();
    render(<Timer initialTime={30} onTimeUp={onTimeUp} />);
    
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByRole('timer')).toHaveAttribute('aria-label', 'Time remaining: 30 seconds');
  });

  test('counts down correctly', () => {
    const onTimeUp = jest.fn();
    render(<Timer initialTime={30} onTimeUp={onTimeUp} />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByText('29')).toBeInTheDocument();
    expect(screen.getByRole('timer')).toHaveAttribute('aria-label', 'Time remaining: 29 seconds');
  });

  test('calls onTimeUp when time reaches zero', () => {
    const onTimeUp = jest.fn();
    render(<Timer initialTime={2} onTimeUp={onTimeUp} />);
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    expect(onTimeUp).toHaveBeenCalledTimes(1);
  });

  test('updates color based on time remaining', () => {
    const onTimeUp = jest.fn();
    const { rerender } = render(<Timer initialTime={15} onTimeUp={onTimeUp} />);
    
    // Time > 10 seconds (green)
    expect(screen.getByRole('timer').querySelector('.timer-circle')).toHaveStyle({
      '--timer-color': '#00ff00'
    });
    
    // Time <= 10 seconds (orange)
    rerender(<Timer initialTime={10} onTimeUp={onTimeUp} />);
    expect(screen.getByRole('timer').querySelector('.timer-circle')).toHaveStyle({
      '--timer-color': '#ff9900'
    });
    
    // Time <= 5 seconds (red)
    rerender(<Timer initialTime={5} onTimeUp={onTimeUp} />);
    expect(screen.getByRole('timer').querySelector('.timer-circle')).toHaveStyle({
      '--timer-color': '#ff0000'
    });
  });

  test('does not count down when inactive', () => {
    const onTimeUp = jest.fn();
    render(<Timer initialTime={30} onTimeUp={onTimeUp} isActive={false} />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(onTimeUp).not.toHaveBeenCalled();
  });

  test('resets timer when initialTime changes', () => {
    const onTimeUp = jest.fn();
    const { rerender } = render(<Timer initialTime={30} onTimeUp={onTimeUp} />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByText('29')).toBeInTheDocument();
    
    rerender(<Timer initialTime={45} onTimeUp={onTimeUp} />);
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  test('cleans up interval on unmount', () => {
    const onTimeUp = jest.fn();
    const { unmount } = render(<Timer initialTime={30} onTimeUp={onTimeUp} />);
    
    unmount();
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(onTimeUp).not.toHaveBeenCalled();
  });
}); 