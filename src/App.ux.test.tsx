import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

// Mock scrollIntoView since it's not implemented in JSDOM
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// Mock window.location.reload
const originalLocation = window.location;
beforeAll(() => {
  delete (window as any).location;
  (window as any).location = { reload: jest.fn() };
});

afterAll(() => {
  window.location = originalLocation;
});

test('window control buttons have accessible names', () => {
  render(<App />);
  // Use getAll because of duplicates with the toggle button
  expect(screen.getByLabelText('Reload terminal')).toBeInTheDocument();
  // We expect at least one, potentially more depending on state
  expect(screen.getAllByLabelText('Minimize terminal').length).toBeGreaterThan(0);
  expect(screen.getAllByLabelText('Maximize terminal').length).toBeGreaterThan(0);
});

test('ProxAI input has accessible name', () => {
  render(<App />);

  // Navigate to ProxAI section first
  // The dock button for 'proxai' contains the text 'proxai' in a span
  const proxAiText = screen.getByText('proxai');
  const proxAiDockButton = proxAiText.closest('button');

  if (!proxAiDockButton) throw new Error('ProxAI dock button not found');

  act(() => {
    fireEvent.click(proxAiDockButton);
  });

  expect(screen.getByLabelText('ProxAI Command Input')).toBeInTheDocument();
});

test('toggling maximize/minimize updates state and labels', async () => {
  render(<App />);

  // Initial state: Not maximized
  // There are "Maximize terminal" buttons (Green traffic light + Toggle)
  const maximizeButtons = screen.getAllByLabelText('Maximize terminal');

  // Click one to maximize
  await act(async () => {
    fireEvent.click(maximizeButtons[0]);
  });

  // Now the state should be maximized.
  // The Header Toggle should now say "Minimize terminal".
  // The Yellow button is also "Minimize terminal".

  const minimizeButtons = screen.getAllByLabelText('Minimize terminal');
  expect(minimizeButtons.length).toBeGreaterThanOrEqual(2);

  // Click one minimize button to restore
  await act(async () => {
    fireEvent.click(minimizeButtons[0]);
  });

  // Now we should be back to having Maximize buttons.
  expect(screen.getAllByLabelText('Maximize terminal').length).toBeGreaterThanOrEqual(2);
});

test('reload button calls window.location.reload', async () => {
  render(<App />);
  const reloadButton = screen.getByLabelText('Reload terminal');

  await act(async () => {
    fireEvent.click(reloadButton);
  });

  expect(window.location.reload).toHaveBeenCalled();
});
