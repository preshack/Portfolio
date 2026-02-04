import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { act } from 'react';

// Mock scrollIntoView which is not implemented in JSDOM
window.HTMLElement.prototype.scrollIntoView = function() {};

// Mock window.location.reload
const originalLocation = window.location;
// @ts-ignore
delete window.location;
window.location = { ...originalLocation, reload: jest.fn() };

describe('App UX Improvements', () => {
  test('Window control buttons have accessible labels and correct behavior', async () => {
    await act(async () => {
      render(<App />);
    });

    // Check for "Reload System" button
    const reloadButton = screen.getByLabelText(/Reload System/i);
    expect(reloadButton).toBeTruthy();

    fireEvent.click(reloadButton);
    expect(window.location.reload).toHaveBeenCalled();

    // Check for "Minimize Terminal" button
    const minimizeButton = screen.getByLabelText(/Minimize Terminal/i);
    expect(minimizeButton).toBeTruthy();

    // Check for "Maximize Terminal" button
    const maximizeButton = screen.getByLabelText(/Maximize Terminal/i);
    expect(maximizeButton).toBeTruthy();
  });
});
