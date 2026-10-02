import {useState} from 'react';
import {SortingType} from '../../const';

type SortingProps = {
  currentType: SortingType;
  onChange: (sortingType: SortingType) => void;
};

const sorting = [
  {
    type: SortingType.Default,
    label: 'Popular',
  },
  {
    type: SortingType.PriceLow,
    label: 'Price: low to high',
  },
  {
    type: SortingType.PriceHigh,
    label: 'Price: high to low',
  },
  {
    type: SortingType.Rating,
    label: 'Top rated first',
  }
];

function Sorting({currentType, onChange}: SortingProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const hangleSortingTypeChange = (sortType: SortingType) => {
    onChange(sortType);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpened(true)}>
        {sorting.find((item) => item.type === currentType)?.label}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`}>
        {sorting.map(({type, label}) => (
          <li
            key={type}
            className={`places__option ${currentType === type && 'places__option--active'}`}
            tabIndex={0}
            onClick={() => hangleSortingTypeChange(type)}
          >
            {label}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
