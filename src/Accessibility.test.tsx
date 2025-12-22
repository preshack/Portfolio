import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('window control buttons have accessible names', () => {
  render(<App />);
  expect(screen.getByLabelText('Reload terminal')).toBeTruthy();
  // There are two buttons with "Maximize window": one in the traffic lights (yellow) and one in the top right.
  const maximizeButtons = screen.getAllByLabelText('Maximize window');
  expect(maximizeButtons).toHaveLength(2);
});

test('proxAI input has accessible name', () => {
  render(<App />);
  // Click the proxai dock button
  const proxaiButton = screen.getByLabelText('proxai');
  fireEvent.click(proxaiButton);

  // It should show the input now.
  expect(screen.getByLabelText('ProxAI command input')).toBeTruthy();
  expect(screen.getByLabelText('Send command')).toBeTruthy();
});

test('dock buttons have accessible names', () => {
  render(<App />);
  const sections = ['home', 'about', 'skills', 'projects', 'contact', 'proxai'];
  sections.forEach(section => {
    expect(screen.getByLabelText(section)).toBeTruthy();
  });
});
