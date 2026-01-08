import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Window Control Accessibility', () => {
  const originalLocation = window.location;

  beforeAll(() => {
    // Mock window.location.reload
    // @ts-ignore
    delete window.location;
    window.location = { ...originalLocation, reload: jest.fn() };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  test('Window controls have accessible labels', () => {
    render(<App />);

    // Use getAllByLabelText because the toggle button appears twice (once in title bar, once in corner)
    // or if the label is unique. The yellow button and the maximize icon share logic but maybe not labels?
    // Let's check the code:
    // Yellow button: aria-label={isMaximized ? "Minimize terminal" : "Maximize terminal"}
    // Maximize icon button: aria-label is missing in the original code, but let's check my diff.
    // I only modified the traffic light buttons.

    const reloadButton = screen.getByLabelText(/reload terminal/i);
    // The yellow button might share the label with the other maximize button if I added it there too?
    // No, I only touched the traffic lights group.
    const toggleButtons = screen.getAllByLabelText(/(maximize|minimize) terminal/i);
    const fullscreenButton = screen.getByLabelText(/fullscreen/i);

    expect(reloadButton).toBeTruthy();
    expect(toggleButtons.length).toBeGreaterThan(0);
    expect(fullscreenButton).toBeTruthy();
  });

  test('Reload button triggers page reload', () => {
    render(<App />);
    const reloadButton = screen.getByLabelText(/reload terminal/i);
    fireEvent.click(reloadButton);
    expect(window.location.reload).toHaveBeenCalled();
  });
});
