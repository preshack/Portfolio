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

test('window controls are accessible', () => {
  render(<App />);

  const reloadBtn = screen.getByLabelText(/Reload terminal/i);
  const minimizeBtn = screen.getByLabelText(/Minimize terminal/i);
  const maximizeBtn = screen.getByLabelText(/Maximize terminal/i);

  expect(reloadBtn).toBeTruthy();
  expect(minimizeBtn).toBeTruthy();
  expect(maximizeBtn).toBeTruthy();

  // Test functionality
  fireEvent.click(reloadBtn);
  expect(window.location.reload).toHaveBeenCalled();
});
