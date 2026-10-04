import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import Header from '../../components/header/header';
import OfferCard from '../../components/offer-card/offer-card';
import Footer from '../../components/footer/footer';
import {Offers, CityName} from '../../types/offers';

type FavoritesPageProps = {
  offers: Offers;
};

type FavoritesOffers = {
  city: CityName;
  offers: Offers;
}[];

function getFavoritesOffersGroups(offers: Offers): FavoritesOffers {
  const filteredOffers = offers.filter(({isFavorite}) => isFavorite);

  return filteredOffers.reduce<FavoritesOffers>((groups, offer) => {
    const city = offer.city.name;
    const cityGroup = groups.find((group) => group.city === city);

    if (cityGroup) {
      cityGroup.offers.push(offer);
    } else {
      groups.push({city, offers: [offer]});
    }

    return groups;
  }, []);
}

function FavoritesPage({offers}: FavoritesPageProps): JSX.Element {
  const favoritesOffersGroups = getFavoritesOffersGroups(offers);

  const isEmpty = offers.length === 0;

  return (
    <div className="page">
      <Helmet>
        <title>Favorites</title>
      </Helmet>

      <Header />

      <main className={`page__main page__main--favorites ${isEmpty && 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {!isEmpty &&
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoritesOffersGroups.map((group) => (
                <li className="favorites__locations-items" key={group.city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{group.city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {group.offers.map((offer) => <OfferCard key={offer.id} offer={offer} offerType='favorite' onHover={() => null} />)}
                  </div>
                </li>
              ))}
            </ul>
          </section>}
          {isEmpty && (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
