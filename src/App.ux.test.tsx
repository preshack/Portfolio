import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';
import App from './App';

// Mock window.location.reload
const originalLocation = window.location;
beforeAll(() => {
  delete (window as any).location;
  (window as any).location = { reload: jest.fn() };
});

afterAll(() => {
  window.location = originalLocation;
});

test('Traffic light buttons have accessible labels and icons', () => {
  render(<App />);

  const reloadButton = screen.getByLabelText('Reload terminal');
  expect(reloadButton).toBeTruthy();

  // Traffic light minimize
  const minimizeButtons = screen.getAllByLabelText('Minimize terminal');
  expect(minimizeButtons.length).toBeGreaterThan(0);

  // Traffic light maximize
  const maximizeButtons = screen.getAllByLabelText('Maximize terminal');
  expect(maximizeButtons.length).toBeGreaterThan(0);
});

test('Toggle button has accessible label', () => {
  render(<App />);
  // Initially isMaximized is false.
  // There are now TWO buttons with "Maximize terminal":
  // 1. The green traffic light button.
  // 2. The top-right toggle button.

  const maximizeBtns = screen.getAllByRole('button', { name: /Maximize terminal/i });
  expect(maximizeBtns.length).toBe(2);

  // The toggle button is the one on the right, likely the second one in DOM order.
  const toggleBtn = maximizeBtns[1];
  expect(toggleBtn).toBeTruthy();

  // Click to maximize
  act(() => {
    fireEvent.click(toggleBtn);
  });

  // Now it should be minimized label.
  // The traffic light "Maximize terminal" button (green) is still there and still labeled "Maximize terminal".
  // The toggle button should now be labeled "Minimize terminal".
  // The yellow traffic light button is also labeled "Minimize terminal".

  const minimizeBtns = screen.getAllByRole('button', { name: /Minimize terminal/i });
  expect(minimizeBtns.length).toBe(2); // Yellow traffic light + Toggle button
});
