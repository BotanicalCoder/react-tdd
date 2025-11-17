import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

test('renders and responds to click', async () => {
  const handle = jest.fn();
  render(<Button onClick={handle}>Press me</Button>);

  expect(screen.getByText('Press me')).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /press me/i }));
  expect(handle).toHaveBeenCalledTimes(1);
});
