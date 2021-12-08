import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app title', () => {
  render(<App />);
  const linkElement = screen.getByText(/TL;DV technical test/i);
  expect(linkElement).toBeInTheDocument();
});
