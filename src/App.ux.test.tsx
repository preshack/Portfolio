import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock window.location.reload
const originalLocation = window.location;
beforeAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...originalLocation, reload: jest.fn() },
  });
});

afterAll(() => {
  Object.defineProperty(window, 'location', { configurable: true, value: originalLocation });
});

test('Window controls have accessible labels and correct logic', () => {
  render(<App />);

  // Expect accessible labels to exist
  // Note: Since we are adding duplicate labels for the header toggle and traffic lights,
  // we use getAllByLabelText.

  const reloadBtns = screen.getAllByLabelText('Reload terminal');
  expect(reloadBtns.length).toBeGreaterThan(0);

  // Initial state: Not maximized.
  // Yellow button (Minimize) acts as Minimize.
  // Green button (Maximize) acts as Maximize.
  // Toggle button (Maximize) acts as Maximize.

  const minimizeBtns = screen.getAllByLabelText('Minimize terminal');
  expect(minimizeBtns.length).toBeGreaterThan(0); // The yellow button

  const maximizeBtns = screen.getAllByLabelText('Maximize terminal');
  expect(maximizeBtns.length).toBeGreaterThan(0); // Green button + Toggle button

  // Find the Green button (it's likely the first one in the traffic light group)
  // But to be safe, let's just click one of them.
  const greenButton = maximizeBtns[0];

  fireEvent.click(greenButton);

  // Now it should be maximized.
  // The Toggle button (which was Maximize) should now become "Minimize terminal".
  // The Yellow button stays "Minimize terminal".
  // So we should have more Minimize buttons now.

  const minimizeBtnsAfter = screen.getAllByLabelText('Minimize terminal');
  // Expected: Yellow button + Toggle button = 2
  expect(minimizeBtnsAfter.length).toBeGreaterThanOrEqual(2);

  // Now click the Yellow button to minimize
  // We need to find the one that is NOT the toggle button, strictly speaking.
  // Or just click the first one.
  fireEvent.click(minimizeBtnsAfter[0]);

  // Should be back to initial state
  const maximizeBtnsAfter = screen.getAllByLabelText('Maximize terminal');
  expect(maximizeBtnsAfter.length).toBeGreaterThanOrEqual(2);
});

test('Dock navigation buttons have accessible labels', () => {
  render(<App />);

  expect(screen.getByLabelText('Home')).toBeTruthy();
  expect(screen.getByLabelText('About')).toBeTruthy();
  expect(screen.getByLabelText('Skills')).toBeTruthy();
  expect(screen.getByLabelText('Projects')).toBeTruthy();
  expect(screen.getByLabelText('Contact')).toBeTruthy();
});
