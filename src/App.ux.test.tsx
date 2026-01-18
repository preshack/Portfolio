import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react';

// Mock window.location.reload
const originalLocation = window.location;
beforeAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { reload: jest.fn() },
  });
});

afterAll(() => {
  Object.defineProperty(window, 'location', { configurable: true, value: originalLocation });
});

test('window controls have accessible labels', () => {
  render(<App />);

  // Reload button
  const reloadButton = screen.getByLabelText(/reload terminal/i);
  expect(reloadButton).toBeTruthy();

  // Maximize terminal is now on both the green button AND the header toggle.
  // We expect 2 elements with this label initially.
  const toggleButtons = screen.getAllByLabelText(/maximize terminal/i);
  expect(toggleButtons.length).toBeGreaterThanOrEqual(2);

  // Minimize terminal (yellow button)
  const minimizeButton = screen.getByLabelText(/minimize terminal/i);
  expect(minimizeButton).toBeTruthy();
});
