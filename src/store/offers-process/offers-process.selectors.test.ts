import { NameSpace } from '../../const';
import { CityName } from '../../types/offers';
import { getCurrentCity } from './selectors';

describe('OffersProcess selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      city: 'Amsterdam' as CityName,
    }
  };

  it('should return current city from state', () => {
    const { city } = state[NameSpace.Offers];

    const result = getCurrentCity(state);

    expect(result).toBe(city);
  });
});
