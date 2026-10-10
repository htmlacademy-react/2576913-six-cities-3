import { setFavoriteOffer, userProcess } from './user-process';
import { makeFakeOffer } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction, toggleFavoriteAction } from '../api-actions';

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
      {offerId: mockOffer.id, offer: mockOffer, status: true},
      'request-id',
      {offerId: mockOffer.id, status: true},
    ));

    expect(result.favoritesOffers).toEqual([mockOffer]);
  });

  it('should remove favorite by offer id when "toggleFavoriteAction" is fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: null,
      favoritesOffers: [mockOffer],
    };

    const result = userProcess.reducer(initialState, toggleFavoriteAction.fulfilled(
      {offerId: mockOffer.id, status: false},
      'request-id',
      {offerId: mockOffer.id, status: false},
    ));

    expect(result.favoritesOffers).toEqual([]);
  });

  it('should not restore authorization when the auth check fulfills after logout', () => {
    const userData = {
      name: 'test',
      email: 'test@test.com',
      avatarUrl: 'https://avatar.jpg',
      token: 'secret',
      isPro: false,
    };
    const loggedOutState = userProcess.reducer({
      authorizationStatus: AuthorizationStatus.Auth,
      userData,
      favoritesOffers: [],
    }, logoutAction.fulfilled(undefined, 'logout-request', undefined));

    const result = userProcess.reducer(
      loggedOutState,
      checkAuthAction.fulfilled(userData, 'auth-check-request', undefined)
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.userData).toBeNull();
  });

  it('should not override a completed login with a stale auth-check failure', () => {
    const userData = {
      name: 'test',
      email: 'test@test.com',
      avatarUrl: 'https://avatar.jpg',
      token: 'secret',
      isPro: false,
    };
    const loggedInState = userProcess.reducer(
      undefined,
      loginAction.fulfilled(userData, 'login-request', {email: userData.email, password: 'password'})
    );

    const result = userProcess.reducer(
      loggedInState,
      checkAuthAction.rejected(new Error('Unauthorized'), 'auth-check-request', undefined)
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.userData).toEqual(userData);
  });
});
