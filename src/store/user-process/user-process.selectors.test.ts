import { internet } from 'faker';
import { NameSpace, AuthorizationStatus } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import { getAuthorizationStatus, getUserData, getFavoritesOffers } from './selectors';

describe('UserProcess selectors', () => {
  const mockFavoriteOffer = makeFakeOffer();
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: {
        name: 'Tom',
        avatarUrl: internet.avatar(),
        isPro: false,
        email: 'test@test.com',
        token: 'secret',
      },
      favoritesOffers: [mockFavoriteOffer],
    },
  };

  it('should return authorization status from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return userdata from state', () => {
    const { userData } = state[NameSpace.User];
    const result = getUserData(state);
    expect(result).toEqual(userData);
  });

  it('should return favorite offers from state', () => {
    const { favoritesOffers } = state[NameSpace.User];
    const result = getFavoritesOffers(state);
    expect(result).toEqual(favoritesOffers);
  });
});
