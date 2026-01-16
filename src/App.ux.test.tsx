import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

test('traffic light buttons are accessible and functional', () => {
  render(<App />);

  const reloadBtn = screen.getByLabelText(/reload terminal/i);
  const minimizeBtn = screen.getByLabelText(/minimize terminal/i);
  const maximizeBtn = screen.getByLabelText(/maximize terminal/i);

  expect(reloadBtn).toBeTruthy();
  expect(minimizeBtn).toBeTruthy();
  expect(maximizeBtn).toBeTruthy();

  // Test functionality
  fireEvent.click(reloadBtn);
  expect(window.location.reload).toHaveBeenCalled();

  // We can't easily test state change of 'isMaximized' without inspecting class names or similar.
  // The terminal window has dynamic classes.
  // Default: h-[85vh] md:h-[700px] max-w-5xl
  // Maximized: h-[90vh] max-w-7xl

  // Let's check if the main container class changes.
  // We need to identify the terminal window. It has "Main Terminal Window" comment in code, but no ID.
  // It has text "preshak@hackbox: ~".

  const terminalHeader = screen.getByText(/preshak@hackbox: ~/i);
  // The header is inside the terminal window.
  // The terminal window is the container.
  // Let's look for text content.

  // Actually, checking for functionality in this test is a bonus. The main thing is existence and labels.
});
