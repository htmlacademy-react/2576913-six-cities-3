import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Offers, Offer, City, OfferInfo} from '../../types/offers';
import Sorting from '../sorting/sorting';
import OfferCard from '../offer-card/offer-card';
import Map from '../map/map';
import {Nullable} from 'vitest';
import {SortingType, AuthorizationStatus, APIRoute, AppRoute} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks/store';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {createAPI} from '../../services/api';
import {setFavoriteOffer} from '../../store/user-process/user-process';
import {replaceOffer} from '../../store/offers-data/offers-data';
import {toast} from 'react-toastify';

type OffersListProps = {
  offers: Offers;
  city: City;
};

function OffersSection({offers, city}: OffersListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);
  const [sorting, setSorting] = useState({
    currentType: SortingType.Default,
    offers: offers,
  });

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isEmpty = offers.length === 0;
  const sourcedOffers = structuredClone(offers);

  const handleOfferHover = (offer?: Offer) => {
    setActiveOffer(offer || null);
  };

  const handleSortingTypeChange = (sortingType: SortingType) => {
    switch(sortingType) {
      case SortingType.Default:
        setSorting({
          currentType: SortingType.Default,
          offers: offers,
        });
        return null;
      case SortingType.PriceLow:
        setSorting({
          currentType: SortingType.PriceLow,
          offers: sourcedOffers.sort((aOffer, bOffer) => aOffer.price - bOffer.price),
        });
        return null;
      case SortingType.PriceHigh:
        setSorting({
          currentType: SortingType.PriceHigh,
          offers: sourcedOffers.sort((aOffer, bOffer) => bOffer.price - aOffer.price),
        });
        return null;
      case SortingType.Rating:
        setSorting({
          currentType: SortingType.Rating,
          offers: sourcedOffers.sort((aOffer, bOffer) => bOffer.rating - aOffer.rating),
        });
        return null;
    }
  };

  const handleFavoriteClick = async (offerId: string, status: boolean): Promise<boolean> => {
    if (!(authorizationStatus === AuthorizationStatus.Auth)) {
      navigate(AppRoute.Login);
      return false;
    }

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

  useEffect(() => {
    setSorting({
      currentType: SortingType.Default,
      offers
    });
  }, [city, offers]);

  return !isEmpty ? (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {city.name}</b>
          <Sorting currentType={sorting.currentType} onChange={handleSortingTypeChange} />
          <div className="cities__places-list places__list tabs__content">
            {
              sorting.offers.map((offer) => (
                <OfferCard
                  key={offer.id} offer={offer}
                  onHover={handleOfferHover}
                  onFavoriteClick={handleFavoriteClick}
                  offerType='city'
                />
              ))
            }
          </div>
        </section>
        <div className="cities__right-section">
          <Map city={city} offers={offers} activeOffer={activeOffer} className='cities__map' />
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
