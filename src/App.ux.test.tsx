import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock scrollTo since it's not implemented in JSDOM
Element.prototype.scrollTo = jest.fn();

test('renders accessible window control buttons', () => {
  render(<App />);

  // These should fail initially as the buttons don't have aria-labels yet
  expect(screen.getByLabelText(/Reload Terminal/i)).toBeTruthy();
  expect(screen.getByLabelText(/Minimize Terminal/i)).toBeTruthy();
  expect(screen.getByLabelText(/Maximize Terminal/i)).toBeTruthy();
});
