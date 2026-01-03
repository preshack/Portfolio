import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Preshak name', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /Preshak/i });
  expect(headingElement).toBeTruthy();
});

test('window control buttons have accessible labels', () => {
  render(<App />);
  const reloadButton = screen.getByLabelText('Reload terminal');
  expect(reloadButton).toBeTruthy();

  // The maximize button label changes based on state, initial state is not maximized
  const maximizeButtons = screen.getAllByLabelText('Maximize terminal');
  expect(maximizeButtons.length).toBeGreaterThan(0);

  const fullscreenButton = screen.getByLabelText('Fullscreen disabled');
  expect(fullscreenButton).toBeTruthy();
});
