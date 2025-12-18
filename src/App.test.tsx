import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Preshak name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Preshak Bhattarai/i);
  expect(nameElement).toBeInTheDocument();
});
