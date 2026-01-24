import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock window.location.reload
const originalReload = window.location.reload;
beforeAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...window.location, reload: jest.fn() },
  });
});

afterAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...window.location, reload: originalReload },
  });
});

test('window control buttons have accessible labels', () => {
  render(<App />);

  // These should fail if aria-labels are missing
  const reloadButton = screen.getByLabelText('Reload Terminal');
  const minimizeButton = screen.getByLabelText('Minimize Terminal');
  const maximizeButton = screen.getByLabelText('Maximize Terminal');

  expect(reloadButton).toBeTruthy();
  expect(minimizeButton).toBeTruthy();
  expect(maximizeButton).toBeTruthy();
});
