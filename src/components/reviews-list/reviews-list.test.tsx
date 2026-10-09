import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import ReviewsList from './reviews-list';

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const mockReviews = [makeFakeReview()];
    const reviewsListTestId = 'reviewsList';

    render(<ReviewsList reviews={mockReviews} />);
    const reviewsList = screen.getByTestId(reviewsListTestId);

    expect(reviewsList).toBeInTheDocument();
    expect(reviewsList.children.length).toBe(mockReviews.length);
  });
});
