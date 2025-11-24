import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputField from '../InputField';
import { FieldError } from 'react-hook-form';

describe('InputField Component', () => {
  it('renders the label and input associated correctly', () => {
    render(<InputField id="Username" label="Username" name="username" />);

    const input = screen.getByLabelText('Username');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'username');
  });

  it('displays error message and error styling when error prop is passed', () => {
    const mockError: FieldError = { 
      type: 'required', 
      message: 'This field is required' 
    };

    render(<InputField id="Email" label="Email" name="email" error={mockError} />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();

    const input = screen.getByLabelText('Email');
    expect(input).toHaveClass('border-red-500');
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<InputField id="Age" label="Age" name="age" type="number" />);

    const input = screen.getByLabelText('Age');
    await user.type(input, '25');

    expect(input).toHaveValue(25);
  });
});