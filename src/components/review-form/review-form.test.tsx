import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './review-form';

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    render(<ReviewForm onSubmit={() => Promise.resolve(true)} />);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'Your review'})).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
    expect(screen.getByRole('button', {name: 'Submit'})).toBeDisabled();
  });

  it('should render form fields and enable submit after valid input', async () => {
    const user = userEvent.setup();
    render(<ReviewForm onSubmit={() => Promise.resolve(true)} />);

    const commentField = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', {name: 'Submit'});
    const ratingInput = screen.getAllByRole('radio')[1];

    expect(screen.getAllByRole('radio')).toHaveLength(5);
    expect(commentField).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await user.click(ratingInput);
    await user.type(commentField, 'A pleasant stay in a lovely apartment with a very helpful host.');

    expect(ratingInput).toBeChecked();
    expect(commentField).toHaveValue('A pleasant stay in a lovely apartment with a very helpful host.');
    expect(submitButton).toBeEnabled();
  });

  it('should clear fields and disable submit after successful submission', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(true);
    render(<ReviewForm onSubmit={onSubmit} />);

    const comment = 'A pleasant stay in a lovely apartment with a very helpful host.';
    const commentField = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', {name: 'Submit'});
    const ratingInput = screen.getAllByRole('radio')[0];

    await user.click(ratingInput);
    await user.type(commentField, comment);
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith({rating: 5, comment});
    await waitFor(() => {
      expect(ratingInput).not.toBeChecked();
      expect(commentField).toHaveValue('');
      expect(submitButton).toBeDisabled();
    });
  });
});
