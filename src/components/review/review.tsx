import {Review} from '../../types/reviews';

type ReviewItemProps = {
  review: Review;
};

function getMonth(monthNumber: number) {
  switch(monthNumber) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'Marсh';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
  }
}

function ReviewItem({review}: ReviewItemProps): JSX.Element {
  const reviewDate = new Date(review.date);
  const reviewMonth = getMonth(reviewDate.getMonth());

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${review.rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>{reviewMonth} {reviewDate.getFullYear()}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
