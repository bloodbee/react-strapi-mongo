import { render, screen, fireEvent } from '@testing-library/react';
import VideosList from './VideosList';

test('renders the videos list', () => {
  render(<VideosList />);

  const tableElement = screen.getByTestId('videos-table');
  expect(tableElement).toBeInTheDocument();
  jest.setTimeout(() => {

    // try opening play dialog
    const rows = screen.getAllByTestId('videos-table-row');
    fireEvent.click(rows[0]);
    expect(screen.getByTestId('play-dialog')).toBeInTheDocument();
  }, 1000);
});

test('display a play dialog', () => {
  render(<VideosList />);

  jest.setTimeout(() => {
    // try opening play dialog
    const rows = screen.getAllByTestId('videos-table-row');
    // click event ont the first row
    fireEvent.click(rows[0]);
    // check dialog is in the dom
    expect(screen.getByTestId('play-dialog')).toBeInTheDocument();
  }, 1000);
});
