import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Preshak name', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /Preshak/i });
  expect(headingElement).toBeTruthy();
});

test('renders accessible terminal controls', () => {
  render(<App />);
  const reloadButton = screen.getByLabelText('Reload system');
  // Match either Maximize or Minimize depending on state
  const maximizeButton = screen.getByLabelText(/Maximize terminal|Minimize terminal/i);
  const fullscreenButton = screen.getByLabelText('Fullscreen (Disabled)');

  expect(reloadButton).toBeTruthy();
  expect(maximizeButton).toBeTruthy();
  expect(fullscreenButton).toBeTruthy();
});
