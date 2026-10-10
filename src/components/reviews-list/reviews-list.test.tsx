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

  it('should show the ten newest reviews in descending date order', () => {
    const mockReviews = Array.from({length: 12}, (_, index) => ({
      ...makeFakeReview(),
      id: `review-${index}`,
      comment: `Comment ${index}`,
      date: new Date(Date.UTC(2023, 0, index + 1)).toISOString(),
    }));
    const newestReview = {
      ...makeFakeReview(),
      id: 'newest-review',
      comment: 'Newest review',
      date: '2025-01-01T00:00:00.000Z',
    };

    render(<ReviewsList reviews={[...mockReviews, newestReview]} />);

    const reviewItems = screen.getAllByTestId('reviewItem');
    expect(reviewItems).toHaveLength(10);
    expect(reviewItems[0]).toHaveTextContent('Newest review');
    expect(reviewItems[1]).toHaveTextContent('Comment 11');
    expect(reviewItems[9]).toHaveTextContent('Comment 3');
  });
});
