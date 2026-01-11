import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputField from '../InputField';

type TestFormValues = {
  testField: string;
};

interface TestWrapperProps {
  onSubmit: SubmitHandler<TestFormValues>;
}

const TestWrapper = ({ onSubmit }: TestWrapperProps) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<TestFormValues>(); 
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField 
        id="Test Field"
        label="Test Field" 
        error={errors.testField}
        {...register('testField', { required: 'Required!' })} 
      />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('InputField Integration with RHF', () => {
  it('submits data correctly through the component', async () => {
    const handleSubmit = jest.fn(); 
    const user = userEvent.setup();

    render(<TestWrapper onSubmit={handleSubmit} />);

    const input = screen.getByLabelText('Test Field');
    await user.type(input, 'Hello World');

    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
            testField: 'Hello World'
        }),
        expect.anything()
      );
    });
  });

  it('blocks submission and shows error if validation fails', async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();

    render(<TestWrapper onSubmit={handleSubmit} />);

    await user.click(screen.getByText('Submit'));

    expect(await screen.findByText('Required!')).toBeInTheDocument();
    
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});