import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SoundControl from '../components/SoundControl';

describe('SoundControl Component', () => {
  const mockToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with unmuted state', () => {
    render(<SoundControl isMuted={false} onToggle={mockToggle} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Mute sound');
    expect(button).toHaveAttribute('title', 'Mute sound');
    expect(button).not.toHaveClass('muted');
  });

  test('renders with muted state', () => {
    render(<SoundControl isMuted={true} onToggle={mockToggle} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Unmute sound');
    expect(button).toHaveAttribute('title', 'Unmute sound');
    expect(button).toHaveClass('muted');
  });

  test('calls onToggle when clicked', () => {
    render(<SoundControl isMuted={false} onToggle={mockToggle} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test('renders correct SVG icon for unmuted state', () => {
    render(<SoundControl isMuted={false} onToggle={mockToggle} />);
    
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  test('renders correct SVG icon for muted state', () => {
    render(<SoundControl isMuted={true} onToggle={mockToggle} />);
    
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });
}); 