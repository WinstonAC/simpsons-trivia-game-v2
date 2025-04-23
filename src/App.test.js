import { render, screen } from '@testing-library/react';
import App from './App';

test('renders landing page', () => {
  render(<App />);
  const titleElement = screen.getByText("D'OH! TRIVIA");
  expect(titleElement).toBeInTheDocument();
  
  const inputElement = screen.getByPlaceholderText('Enter Your Name');
  expect(inputElement).toBeInTheDocument();
  
  const buttonElement = screen.getByText('ENTER');
  expect(buttonElement).toBeInTheDocument();
});
