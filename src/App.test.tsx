import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import App from './App';

test('renders Preshak name', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /Preshak/i });
  expect(headingElement).toBeTruthy();
});
