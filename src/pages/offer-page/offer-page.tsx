import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
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
import {useAppSelector} from '../../hooks/store';
import {CITIES, APIRoute, AuthorizationStatus} from '../../const';
import {Nullable} from 'vitest';
import {createAPI} from '../../services/api';

function OfferPage(): JSX.Element {
  const [isNeedScroll, setIsNeedScroll] = useState(false);
  const [isFound, setIsFound] = useState(true);
  const [foundOffer, setFoundOffer] = useState<Nullable<OfferInfo>>(null);
  const [reviews, setReviews] = useState<Nullable<Reviews>>(null);
  const [nearestOffers, setNearestOffers] = useState<Nullable<Offers>>(null);

  const { id } = useParams();

  const currentCity = useAppSelector((state) => state.city);
  const currentCityData = CITIES.find((city) => city.name === currentCity);
  const currentOffer = useAppSelector((state) => state.offers).find((offer) => offer.id === id);
  const offersForMap = nearestOffers?.slice(0, 3);
  offersForMap?.push(currentOffer as Offer);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

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

  useEffect(() => {
    const api = createAPI();
    setIsNeedScroll(true);

    api.get<OfferInfo>(`${APIRoute.Offers}/${id}`)
      .then(({data}) => setFoundOffer(data))
      .catch(() => {
        setIsFound(false);
      });

    api.get<Reviews>(`${APIRoute.Comments}/${id}`)
      .then(({data}) => setReviews(data.slice(0, 10)))
      .catch(() => toast.error('Failed to load comments!'));

    api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`)
      .then(({data}) => setNearestOffers(data))
      .catch(() => toast.error('Failed to load nearest offers!'));
  }, [id]);

  if (!isFound) {
    return <NotFoundPage type='offer' />;
  }

  return foundOffer && reviews && nearestOffers ? (
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
              {foundOffer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <OfferDescription offer={foundOffer} />
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
                <OfferCard key={nearestOffer.id} offer={nearestOffer} onHover={() => null} offerType='nearest' />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  ) : <Loader />;
}

export default OfferPage;
