import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {toast} from 'react-toastify';
import Header from '../../components/header/header';
import OfferDescription from '../../components/offer-description/offer-description';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewForm, {FormData} from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import OfferCard from '../../components/offer-card/offer-card';
import NotFoundPage from '../not-found-page/not-found-page';
import Loader from '../../components/loader/loader';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import {City, Offers, OfferInfo, Offer} from '../../types/offers';
import {Reviews, Review} from '../../types/reviews';
import {useAppSelector, useAppDispatch} from '../../hooks/store';
import {getCurrentCity} from '../../store/offers-process/selectors';
import {getOffers} from '../../store/offers-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {CITIES, APIRoute, AuthorizationStatus, AppRoute} from '../../const';
import {Nullable} from 'vitest';
import {createAPI} from '../../services/api';
import {toggleFavoriteAction} from '../../store/api-actions';

function OfferPage(): JSX.Element {
  const [isNeedScroll, setIsNeedScroll] = useState(false);
  const [isFound, setIsFound] = useState(true);
  const [foundOfferInfo, setFoundOfferInfo] = useState<Nullable<OfferInfo>>(null);
  const [reviews, setReviews] = useState<Nullable<Reviews>>(null);
  const [nearestOffers, setNearestOffers] = useState<Nullable<Offers>>(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector(getCurrentCity);
  const currentCityData = CITIES.find((city) => city.name === currentCity);
  const offers = useAppSelector(getOffers);
  const currentOffer = offers.find((offer) => offer.id === id);
  const offersForMap = nearestOffers?.slice(0, 3);
  offersForMap?.push(currentOffer as Offer);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleReviewSubmit = async (newComment: FormData): Promise<boolean> => {
    const api = createAPI();
    setIsNeedScroll(false);

    try {
      const { data } = await api.post<Review>(`${APIRoute.Comments}/${id}`, newComment);
      setReviews([data].concat(reviews as Reviews).slice(0, 10));
      return true;
    } catch {
      toast.error('Failed to submit new comment!');
      return false;
    }
  };

  const handleFavoriteClick = async (offerId: string, status: boolean): Promise<boolean> => {
    if (!(authorizationStatus === AuthorizationStatus.Auth)) {
      navigate(AppRoute.Login);
      return false;
    }

    setIsNeedScroll(false);
    try {
      await dispatch(toggleFavoriteAction({offerId, status})).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const api = createAPI();
    setIsNeedScroll(true);

    api.get<OfferInfo>(`${APIRoute.Offers}/${id}`)
      .then(({data}) => setFoundOfferInfo(data))
      .catch(() => {
        setIsFound(false);
      });

    api.get<Reviews>(`${APIRoute.Comments}/${id}`)
      .then(({data}) => setReviews(data.slice(0, 10).reverse()))
      .catch(() => toast.error('Failed to load comments!'));

    api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`)
      .then(({data}) => setNearestOffers(data))
      .catch(() => toast.error('Failed to load nearest offers!'));
  }, [id]);

  if (!isFound) {
    return <NotFoundPage type='offer' />;
  }

  return foundOfferInfo && reviews && nearestOffers ? (
    <div className="page">
      <Helmet>
        <title>Offer</title>
      </Helmet>

      <Header />

      {isNeedScroll && <ScrollToTop />}
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {foundOfferInfo.images.slice(0, 6).map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <OfferDescription offer={foundOfferInfo} onFavoriteClick={handleFavoriteClick} />
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth &&
                <ReviewForm onSubmit={handleReviewSubmit} />}
              </section>
            </div>
          </div>
          <Map city={currentCityData as City} offers={offersForMap as Offers} activeOffer={currentOffer} className='offer__map' />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearestOffers.map((nearestOffer) => (
                <OfferCard
                  key={nearestOffer.id}
                  offer={nearestOffer}
                  onHover={() => null}
                  onFavoriteClick={handleFavoriteClick}
                  offerType='nearest'
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  ) : <Loader />;
}

export default OfferPage;
