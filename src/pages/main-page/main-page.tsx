import cn from 'classnames';
import {City} from '../../types/offers';
import {setCity} from '../../store/action';
import Header from '../../components/header/header';
import Locations from '../../components/locations/locations';
import OffersSection from '../../components/offers-section/offers-section';
import {useAppSelector, useAppDispatch} from '../../hooks/store';
import {CITIES} from '../../const';

function MainPage(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const currentCity = useAppSelector((state) => state.city);
  const currentCityData = CITIES.find((city) => city.name === currentCity);
  const currentOffers = offers.filter((offer) => offer.city.name === currentCity);

  const dispatch = useAppDispatch();

  const isEmpty = currentOffers.length === 0;

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={cn('page__main', 'page__main--index', {'page__main--index-empty': isEmpty})}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations cities={CITIES} currentCity={currentCity} onChange={(checkedCity) => dispatch(setCity(checkedCity as never))} />
        </div>
        <OffersSection offers={currentOffers} city={currentCityData as City} />
      </main>
    </div>
  );
}

export default MainPage;
