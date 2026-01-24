import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock window.location.reload since it's not implemented in JSDOM
Object.defineProperty(window, 'location', {
  configurable: true,
  value: { reload: jest.fn() },
});

describe('App UX Enhancements', () => {
  test('Terminal traffic lights have accessible labels', () => {
    render(<App />);

    // These should exist after the enhancement
    const closeBtn = screen.getByLabelText(/Close terminal/i);
    const minBtn = screen.getByLabelText(/Minimize terminal/i);
    const maxBtn = screen.getByLabelText(/Maximize terminal/i);

    expect(closeBtn).toBeTruthy();
    expect(minBtn).toBeTruthy();
    expect(maxBtn).toBeTruthy();
  });
});
