import { render, screen } from '@testing-library/react';
import App from './App';

test('renders terminal window controls with accessible labels', () => {
  render(<App />);

  expect(screen.getByLabelText('Close terminal')).toBeTruthy();
  expect(screen.getByLabelText('Minimize terminal')).toBeTruthy();
  expect(screen.getByLabelText('Maximize terminal')).toBeTruthy();
});
