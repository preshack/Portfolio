import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import App from './App';

// Mock window.location.reload
const originalLocation = window.location;
beforeAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { reload: jest.fn() },
  });
});

afterAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: originalLocation,
  });
});

test('window controls have accessible names and correct behaviors', () => {
  render(<App />);

  // Check for Reload button
  const reloadBtn = screen.getByLabelText(/reload terminal/i);
  expect(reloadBtn).toBeTruthy();

  fireEvent.click(reloadBtn);
  expect(window.location.reload).toHaveBeenCalled();

  // Check for Minimize/Maximize buttons
  // Note: We now have multiple buttons for minimize/maximize (traffic lights and header toggle)
  // So we use getAllByLabelText

  // Traffic light yellow (Minimize) and/or toggle button depending on state
  // Initially isMaximized is false, so toggle button is "Maximize terminal"
  // Traffic light yellow is always "Minimize terminal"
  const minimizeBtns = screen.getAllByLabelText(/minimize terminal/i);
  expect(minimizeBtns.length).toBeGreaterThanOrEqual(1);

  // Traffic light green (Maximize) and toggle button (Maximize)
  const maximizeBtns = screen.getAllByLabelText(/maximize terminal/i);
  expect(maximizeBtns.length).toBeGreaterThanOrEqual(1);

  // Verify interaction on one of them
  fireEvent.click(maximizeBtns[0]);
  // After clicking maximize, the state changes.
  // The toggle button should now be "Minimize terminal".

  // Re-query to verify state change
  const newMinimizeBtns = screen.getAllByLabelText(/minimize terminal/i);
  // Should have yellow traffic light AND toggle button now
  expect(newMinimizeBtns.length).toBeGreaterThanOrEqual(2);
});
