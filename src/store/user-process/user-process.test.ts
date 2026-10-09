import { setFavoriteOffer, userProcess } from './user-process';
import { makeFakeOffer } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import { toggleFavoriteAction } from '../api-actions';

describe('UserProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const mockOffer = makeFakeOffer();
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: null,
      favoritesOffers: [mockOffer],
    };

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
      favoritesOffers: [],
    };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should add offer to favorites with "setFavoriteOffer" action', () => {
    const mockOffer = makeFakeOffer();
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
      favoritesOffers: [],
    };

    const result = userProcess.reducer(initialState, setFavoriteOffer({
      offer: mockOffer,
      status: true,
    }));

    expect(result.favoritesOffers).toEqual([mockOffer]);
  });

  it('should remove offer from favorites with "setFavoriteOffer" action', () => {
    const mockOffer = makeFakeOffer();
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
      favoritesOffers: [mockOffer],
    };

    const result = userProcess.reducer(initialState, setFavoriteOffer({
      offer: mockOffer,
      status: false,
    }));

    expect(result.favoritesOffers).toEqual([]);
  });

  it('should update favorites when "toggleFavoriteAction" is fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: null,
      favoritesOffers: [],
    };

    const result = userProcess.reducer(initialState, toggleFavoriteAction.fulfilled(
      {offer: mockOffer, status: true},
      'request-id',
      {offerId: mockOffer.id, status: true},
    ));

    expect(result.favoritesOffers).toEqual([mockOffer]);
  });
});
