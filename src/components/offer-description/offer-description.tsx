import {useState} from 'react';
import {OfferInfo} from '../../types/offers';

type OfferInfoProps = {
  offer: OfferInfo;
  onFavoriteClick: (offerId: string, status: boolean) => Promise<boolean>;
};

function OfferDescription({offer, onFavoriteClick}: OfferInfoProps): JSX.Element {
  const { id, isPremium, title, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description } = offer;
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = async () => {
    setFavorite(!favorite);
    await onFavoriteClick(id, !favorite);
  };

  return (
    <>
      {isPremium &&
      <div className="offer__mark">
        <span>Premium</span>
      </div>}
      <div className="offer__name-wrapper">
        <h1 className="offer__name">
          {title}
        </h1>
        <button
          className={`offer__bookmark-button ${favorite && 'offer__bookmark-button--active'} button`}
          type="button"
          onClick={() => {
            handleFavoriteClick();
          }}
        >
          <svg className="offer__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={{width: `${Math.round(rating) * 20}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">{rating}</span>
      </div>
      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">
          {type}
        </li>
        <li className="offer__feature offer__feature--bedrooms">
          {bedrooms} Bedroom{bedrooms > 1 && 's'}
        </li>
        <li className="offer__feature offer__feature--adults">
          Max {maxAdults} adult{maxAdults > 1 && 's'}
        </li>
      </ul>
      <div className="offer__price">
        <b className="offer__price-value">&euro;{price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>
      <div className="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>
        <ul className="offer__inside-list">
          {goods.map((item) => <li className="offer__inside-item" key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="offer__host">
        <h2 className="offer__host-title">Meet the host</h2>
        <div className="offer__host-user user">
          <div className={`offer__avatar-wrapper ${host.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
            <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
          </div>
          <span className="offer__user-name">
            {host.name}
          </span>
          {host.isPro && (
            <span className="offer__user-status">
              Pro
            </span>
          )}
        </div>
        <div className="offer__description">
          <p className="offer__text">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}

export default OfferDescription;
