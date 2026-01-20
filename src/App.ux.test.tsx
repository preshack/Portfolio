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

test('renders accessible traffic light buttons', () => {
  render(<App />);

  const closeButton = screen.getByLabelText('Close terminal');
  expect(closeButton).toBeTruthy();

  // Verify maximize buttons (traffic light + toggle)
  // Initial state is not maximized, so green button is "Maximize terminal" and toggle is "Maximize terminal"
  const maximizeButtons = screen.getAllByLabelText('Maximize terminal');
  expect(maximizeButtons.length).toBeGreaterThanOrEqual(2);

  // Verify minimize button (traffic light)
  // The yellow button is always "Minimize terminal" (it minimizes/restores)
  const minimizeButton = screen.getByLabelText('Minimize terminal');
  expect(minimizeButton).toBeTruthy();
});

test('traffic light buttons interaction', () => {
  render(<App />);

  // Green button (Maximize)
  // The traffic light one is likely the first one in the DOM as it is in the left group
  const maximizeButtons = screen.getAllByLabelText('Maximize terminal');
  const greenButton = maximizeButtons[0];

  act(() => {
    fireEvent.click(greenButton);
  });

  // After maximize, the toggle button (top right) should change label to "Minimize terminal"
  // So now we should have two "Minimize terminal" buttons (Yellow + Toggle)
  const minimizeButtons = screen.getAllByLabelText('Minimize terminal');
  expect(minimizeButtons.length).toBeGreaterThanOrEqual(2);
});

test('close button triggers reload', () => {
  render(<App />);
  const closeButton = screen.getByLabelText('Close terminal');

  fireEvent.click(closeButton);
  expect(window.location.reload).toHaveBeenCalled();
});
