import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import Header from '../../components/header/header';
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

  return (
    <div className="page">
      <Helmet>
        <title>Favorites</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
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
                    {group.offers.map((offer) => (
                      <Link key={offer.id} to={`/offer/${offer.id}`}>
                        <article className="favorites__card place-card">
                          <div className="favorites__image-wrapper place-card__image-wrapper">
                            <a href="#">
                              <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
                            </a>
                          </div>
                          <div className="favorites__card-info place-card__info">
                            <div className="place-card__price-wrapper">
                              <div className="place-card__price">
                                <b className="place-card__price-value">&euro;{offer.price}</b>
                                <span className="place-card__price-text">&#47;&nbsp;night</span>
                              </div>
                              <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                                <svg className="place-card__bookmark-icon" width="18" height="19">
                                  <use xlinkHref="#icon-bookmark"></use>
                                </svg>
                                <span className="visually-hidden">In bookmarks</span>
                              </button>
                            </div>
                            <div className="place-card__rating rating">
                              <div className="place-card__stars rating__stars">
                                <span style={{width: `${offer.rating * 20}%`}}></span>
                                <span className="visually-hidden">Rating</span>
                              </div>
                            </div>
                            <h2 className="place-card__name">
                              <a href="#">{offer.title}</a>
                            </h2>
                            <p className="place-card__type">{offer.type}</p>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
