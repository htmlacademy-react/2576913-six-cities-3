import cn from 'classnames';
import {City, CityName} from '../../types/offers';

type LocationsProps = {
  cities: readonly City[];
  currentCity: CityName;
  onChange: (checkedCity: CityName) => void;
};

function Locations({cities, currentCity, onChange}: LocationsProps): JSX.Element {
  return (
    <section className="locations container" data-testid="locationsContainer">
      <ul className="locations__list tabs__list">
        {cities.map(({name}) => (
          <li key={name} className="locations__item">
            <a
              className={cn('locations__item-link', 'tabs__item', {'tabs__item--active': name === currentCity})}
              href="#"
              onClick={() => onChange(name)}
              data-testid="locationsValue"
            >
              <span>{name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Locations;
