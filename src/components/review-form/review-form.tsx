import {Fragment, ReactEventHandler, FormEvent, useState} from 'react';

type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export type FormData = {
  rating: number;
  comment: string;
};

type ReviewFormProps = {
  onSubmit: (data: FormData) => Promise<boolean>;
};

const rating = [
  {value: 5, label: 'perfect'},
  {value: 4, label: 'good'},
  {value: 3, label: 'not bad'},
  {value: 2, label: 'badly'},
  {value: 1, label: 'terribly'},
];

function ReviewForm({onSubmit}: ReviewFormProps): JSX.Element {
  const [review, setReview] = useState<FormData>({rating: 0, comment: ''});
  const [isDisabled, setIsDisabled] = useState(false);

  const isDisabledSubmitButton = review.comment.length < 50 || review.comment.length > 300 || review.rating === 0 || isDisabled;

  const handleReviewChange: ChangeHandler = (evt) => {
    const { name, value } = evt.currentTarget;
    setReview({...review, [name]: name === 'rating' ? Number(value) : value});
  };

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    setIsDisabled(true);

    const isSubmitted = await onSubmit(review);
    if (isSubmitted) {
      setReview({rating: 0, comment: ''});
    }
    setIsDisabled(false);
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        void handleSubmit(evt);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {rating.map(({value, label}) => (
          <Fragment key={label}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              checked={review.rating === value}
              id={`${value}-stars`}
              type="radio"
              disabled={isDisabled}
              onChange={handleReviewChange}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={label}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        value={review.comment}
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isDisabled}
        onChange={handleReviewChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabledSubmitButton}
        >
            Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
