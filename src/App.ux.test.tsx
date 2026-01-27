import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock window.location.reload
const originalLocation = window.location;

beforeAll(() => {
  // Delete the existing location property to override it
  delete (window as any).location;
  (window as any).location = { reload: jest.fn() };
});

afterAll(() => {
  window.location = originalLocation;
});

test('renders accessible window controls', () => {
  render(<App />);
  const reloadBtn = screen.getByLabelText(/reload terminal/i);
  const minimizeBtn = screen.getByLabelText(/minimize terminal/i);
  const maximizeBtn = screen.getByLabelText(/maximize terminal/i);

  expect(reloadBtn).toBeTruthy();
  expect(minimizeBtn).toBeTruthy();
  expect(maximizeBtn).toBeTruthy();
});

test('maximize and minimize buttons toggle window state', () => {
  render(<App />);
  const maximizeBtn = screen.getByLabelText(/maximize terminal/i);
  const minimizeBtn = screen.getByLabelText(/minimize terminal/i);

  // Find the window container by looking for unique text inside it
  const terminalText = screen.getByText(/preshak@hackbox/i);
  // traverse up: span -> div (flex gap-2) -> div (flex items-center gap-2) -> div (title bar) -> div (window container)
  // Actually, easiest is to find the title bar text and go up two levels?
  // Or just check that there is a container with the expected class in the document.

  // Let's use closest() which is cleaner if supported in JSDOM (it is).
  // The text is inside:
  // <div className="flex items-center ..."> ... <span>preshak@hackbox...</span> ... </div> (part of title bar)
  // Title bar is: <div className="flex items-center justify-between ...">
  // Window container is the parent of Title bar.

  const titleBar = terminalText.closest('.border-b.border-gray-800'); // identifying class on title bar
  const windowContainer = titleBar?.parentElement;

  expect(windowContainer).toBeTruthy();

  // Initial state check (Not maximized)
  expect(windowContainer?.className).toContain('h-[85vh]');
  expect(windowContainer?.className).toContain('max-w-5xl');

  // Click Maximize
  fireEvent.click(maximizeBtn);

  // Check if class changed to maximized
  expect(windowContainer?.className).toContain('h-[90vh]');
  expect(windowContainer?.className).toContain('max-w-7xl');

  // Click Minimize
  fireEvent.click(minimizeBtn);

  // Check if class changed back
  expect(windowContainer?.className).toContain('h-[85vh]');
  expect(windowContainer?.className).toContain('max-w-5xl');
});

test('reload button triggers page reload', () => {
  render(<App />);
  const reloadBtn = screen.getByLabelText(/reload terminal/i);
  fireEvent.click(reloadBtn);
  expect(window.location.reload).toHaveBeenCalled();
});
