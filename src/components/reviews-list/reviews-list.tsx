import {Reviews, Review} from '../../types/reviews';
import ReviewItem from '../review/review';

type ReviewsListProps = {
  reviews: Reviews;
};

function sortReviewsByDate(aReview: Review, bReview: Review) {
  return new Date(bReview.date).getTime() - new Date(aReview.date).getTime();
}

function ReviewsList({reviews}: ReviewsListProps):JSX.Element {
  const sortedReviews = [...reviews].sort(sortReviewsByDate).slice(0, 10);

  return (
    <ul className="reviews__list" data-testid="reviewsList">
      {sortedReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
