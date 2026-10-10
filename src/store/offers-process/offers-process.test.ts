import { CITIES } from '../../const';
import { setCity, offersProcess } from './offers-process';

describe('OffersProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { city: CITIES[2].name };

    const result = offersProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { city: CITIES[0].name };

    const result = offersProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set city with "setCity" action', () => {
    const initialState = { city: CITIES[0].name };
    const expectedCity = CITIES[3].name;

    const result = offersProcess.reducer(initialState, setCity(expectedCity));

    expect(result.city).toBe(expectedCity);
  });
});
