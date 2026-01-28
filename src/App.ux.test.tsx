import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { act } from 'react';

describe('Terminal Window Controls UX', () => {
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

  test('renders window control buttons with accessible labels', () => {
    render(<App />);

    const reloadButton = screen.getByLabelText(/Reload Terminal/i);
    const minimizeButton = screen.getByLabelText(/Minimize Terminal/i);
    const maximizeButton = screen.getByLabelText(/Maximize Terminal/i);

    expect(reloadButton).toBeTruthy();
    expect(minimizeButton).toBeTruthy();
    expect(maximizeButton).toBeTruthy();
  });

  test('reload button calls window.location.reload', () => {
      render(<App />);
      const reloadButton = screen.getByLabelText(/Reload Terminal/i);
      fireEvent.click(reloadButton);
      expect(window.location.reload).toHaveBeenCalled();
  });
});
