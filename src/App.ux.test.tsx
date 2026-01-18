import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

// Mock scrollTo since it's not implemented in jsdom
Element.prototype.scrollTo = jest.fn();

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

test('renders terminal window controls with accessibility labels', () => {
  render(<App />);

  // Check for the three window control buttons
  const closeButton = screen.getByLabelText('Close terminal');
  const minimizeButton = screen.getAllByLabelText('Minimize terminal')[0]; // There is another Minimize button in the header (the toggle)
  const maximizeButton = screen.getAllByLabelText('Maximize terminal')[0]; // There is another Maximize button in the header (the toggle)

  expect(closeButton).toBeTruthy();
  expect(minimizeButton).toBeTruthy();
  expect(maximizeButton).toBeTruthy();
});

test('red button calls window reload', () => {
  render(<App />);
  const closeButton = screen.getByLabelText('Close terminal');

  fireEvent.click(closeButton);
  expect(window.location.reload).toHaveBeenCalled();
});
