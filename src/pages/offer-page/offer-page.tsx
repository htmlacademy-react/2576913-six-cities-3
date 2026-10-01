import {useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import OfferCard from '../../components/offer-card/offer-card';
import NotFoundPage from '../not-found-page/not-found-page';
import {City, Offers} from '../../types/offers';
import {Reviews} from '../../types/reviews';
import {nearestOffers} from '../../mocks/nearest-offers';
import {useAppSelector} from '../../hooks/store';
import {CITIES} from '../../const';

type OfferPageProps = {
  offers: Offers;
  reviews: Reviews;
};

function OfferPage({offers, reviews}: OfferPageProps): JSX.Element {
  const { id } = useParams();
  const foundOffer = offers.find((offer) => offer.id === id);
  const currentCity = useAppSelector((state) => state.city);
  const currentCityData = CITIES.find((city) => city.name === currentCity);

  return foundOffer ? (
    <div className="page">
      <Helmet>
        <title>Offer</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {foundOffer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {foundOffer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {foundOffer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${foundOffer.rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{foundOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {foundOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {foundOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {foundOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{foundOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {foundOffer.goods.map((item) => <li className="offer__inside-item" key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${foundOffer.host.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={foundOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {foundOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {foundOffer.host.isPro && 'Pro'}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {foundOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map city={currentCityData as City} offers={nearestOffers} className='offer__map' />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearestOffers.map((nearestOffer) => (
                <OfferCard key={nearestOffer.id} offer={nearestOffer} onHover={() => null} offerType='nearest' />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  ) : <NotFoundPage type='offer' />;
}

export default OfferPage;
