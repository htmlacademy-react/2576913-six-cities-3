import {Offer} from '../../types/offers';
import {Link} from 'react-router-dom';

type OfferCardProps = {
  offer: Offer;
  onHover: (offer?: Offer) => void;
};

function OfferCard({offer, onHover}: OfferCardProps): JSX.Element {
  const { id, isPremium, previewImage, price, rating, title, type } = offer;

  const handleMouseEnter = () => {
    onHover(offer);
  };

  const handleMouseLeave = () => {
    onHover();
  };

  return (
    <Link to={`/offer/${id}`}>
      <article className="cities__card place-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${20 * rating}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{title}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    </Link>
  );
}

export default OfferCard;
