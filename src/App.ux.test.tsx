import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock window.location.reload since it's not implemented in JSDOM
const originalReload = window.location.reload;
Object.defineProperty(window, 'location', {
  writable: true,
  value: { reload: jest.fn() },
});

afterAll(() => {
  window.location.reload = originalReload;
});

test('window control buttons have accessible labels', () => {
  render(<App />);

  // These should exist and be accessible
  const reloadButton = screen.getByLabelText(/Reload terminal/i);
  expect(reloadButton).toBeTruthy();

  // The maximize button (yellow)
  const maximizeButton = screen.getAllByLabelText(/Maximize terminal/i)[0]; // There might be two (yellow dot + toggle icon)
  expect(maximizeButton).toBeTruthy();

  // The disabled/fullscreen button (green)
  const fullscreenButton = screen.getByLabelText(/Fullscreen/i);
  expect(fullscreenButton).toBeTruthy();
});

test('toggle button updates aria-label when clicked', () => {
  render(<App />);

  // Find buttons that control maximization (yellow dot and icon button)
  const maximizeButtons = screen.getAllByLabelText(/Maximize terminal/i);

  // Click one (e.g., the icon button which is likely the second one or we can just pick the first)
  fireEvent.click(maximizeButtons[0]);

  // Now they should say "Minimize terminal"
  const minimizeButtons = screen.getAllByLabelText(/Minimize terminal/i);
  expect(minimizeButtons.length).toBeGreaterThan(0);
});
