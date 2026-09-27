import {useState} from 'react';
import {Offers, Offer} from '../../types/offers';
import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import { Nullable } from 'vitest';

type OffersListProps = {
  offers: Offers;
};

const CITY = {
  title: 'Amsterdam',
  lat: 52.3909553943508,
  lng: 4.85309666406198,
  zoom: 8,
};

function OffersSection({offers}: OffersListProps): JSX.Element {
  const [, setActiveOffer] = useState<Nullable<Offer>>(null);

  const handleOfferHover = (offer?: Offer) => {
    setActiveOffer(offer || null);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in Amsterdam</b>
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
              offers.map((offer) => <OfferCard key={offer.id} offer={offer} onHover={handleOfferHover} />)
            }
          </div>
        </section>
        <div className="cities__right-section">
          <Map city={CITY} offers={offers} className='cities__map' />
        </div>
      </div>
    </div>
  );
}

export default OffersSection;
