import { render, screen } from '@testing-library/react';
import App from './App';
//import Table from './Table';

test('renders learn react link', () => {
 // render(<Table />);
  render(<App/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
