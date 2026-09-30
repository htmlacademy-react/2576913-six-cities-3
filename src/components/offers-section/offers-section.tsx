import {useState} from 'react';
import {Offers, Offer, City} from '../../types/offers';
import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import { Nullable } from 'vitest';

type OffersListProps = {
  offers: Offers;
  city: City;
};

function OffersSection({offers, city}: OffersListProps): JSX.Element {
  const [, setActiveOffer] = useState<Nullable<Offer>>(null);

  const isEmpty = offers.length === 0;

  const handleOfferHover = (offer?: Offer) => {
    setActiveOffer(offer || null);
  };

  return !isEmpty ? (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {city.name}</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
          <div className="cities__places-list places__list tabs__content">
            {
              offers.map((offer) => <OfferCard key={offer.id} offer={offer} onHover={handleOfferHover} offerType='city' />)
            }
          </div>
        </section>
        <div className="cities__right-section">
          <Map city={city} offers={offers} className='cities__map' />
        </div>
      </div>
    </div>
  ) : (
    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in {city.name}</p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  );
}

export default OffersSection;
