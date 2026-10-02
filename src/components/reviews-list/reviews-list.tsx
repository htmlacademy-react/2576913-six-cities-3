import {Reviews} from '../../types/reviews';
import ReviewItem from '../review/review';

type ReviewsListProps = {
  reviews: Reviews;
};

function ReviewsList({reviews}: ReviewsListProps):JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => <ReviewItem key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewsList;
