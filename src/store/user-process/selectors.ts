import {RootState} from '../../types/store';
import {NameSpace, AuthorizationStatus} from '../../const';
import {UserData} from '../../types/user-data';
import {Offers} from '../../types/offers';

export const getAuthorizationStatus = (state: RootState): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getUserData = (state: RootState): UserData | null => state[NameSpace.User].userData;

export const getFavoritesOffers = (state: RootState): Offers => state[NameSpace.User].favoritesOffers;
