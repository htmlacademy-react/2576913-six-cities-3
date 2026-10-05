import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import OfferCard from '../../components/offer-card/offer-card';
import Footer from '../../components/footer/footer';
import {Offers, Offer, CityName, OfferInfo} from '../../types/offers';
import {useAppSelector, useAppDispatch} from '../../hooks/store';
import {getFavoritesOffers} from '../../store/user-process/selectors';
import {setFavoriteOffer} from '../../store/user-process/user-process';
import {replaceOffer} from '../../store/offers-data/offers-data';
import {getOffers} from '../../store/offers-data/selectors';
import {createAPI} from '../../services/api';
import {APIRoute} from '../../const';
import {toast} from 'react-toastify';

type FavoritesOffers = {
  city: CityName;
  offers: Offers;
}[];

function FavoritesPage(): JSX.Element {
  const favoritesOffers = useAppSelector(getFavoritesOffers);
  const offers = useAppSelector(getOffers);

  const dispatch = useAppDispatch();

  function getFavoritesOffersGroups(favoriteOffers: Offers): FavoritesOffers {
    return favoriteOffers.reduce<FavoritesOffers>((groups, offer) => {
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

  const favoritesOffersGroups = getFavoritesOffersGroups(favoritesOffers);

  const isEmpty = favoritesOffersGroups.length === 0;

  const handleFavoriteClick = async (offerId: string, status: boolean): Promise<boolean> => {
    const api = createAPI();
    try {
      const {data} = await api.post<OfferInfo>(`${APIRoute.Favorite}/${offerId}/${Number(status)}`);
      let foundOffer = offers.find(({id}) => data.id === id) as Offer;
      foundOffer = {
        ...structuredClone(foundOffer),
        isFavorite: !(foundOffer?.isFavorite),
      };
      dispatch(setFavoriteOffer({offer: foundOffer, status}));
      dispatch(replaceOffer(foundOffer));
      return true;
    } catch {
      const message = status ? 'Failed to add to favorites!' : 'Failed to remove from favorites!';
      toast.error(message);
      return false;
    }
  };

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
                    {group.offers.map((offer) => (
                      <OfferCard
                        key={offer.id}
                        offer={offer}
                        offerType='favorite'
                        onHover={() => null}
                        onFavoriteClick={handleFavoriteClick}
                      />
                    ))}
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
