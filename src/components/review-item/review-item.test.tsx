import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import ReviewItem from './review-item';

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const mockReview = makeFakeReview();
    const reviewItemTestId = 'reviewItem';
    const altText = 'Reviews avatar';
    const { comment, user } = mockReview;

    render(<ReviewItem review={mockReview} />);
    const reviewItem = screen.getByTestId(reviewItemTestId);

    expect(reviewItem).toBeInTheDocument();
    expect(screen.getByAltText(altText)).toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(comment)).toBeInTheDocument();
  });
});
