import {RootState} from '../../types/store';
import {NameSpace, AuthorizationStatus} from '../../const';
import {UserData} from '../../types/user-data';
import {Offers} from '../../types/offers';

export const getAuthorizationStatus = (state: Pick<RootState, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getUserData = (state: Pick<RootState, NameSpace.User>): UserData | null => state[NameSpace.User].userData;

export const getFavoritesOffers = (state: Pick<RootState, NameSpace.User>): Offers => state[NameSpace.User].favoritesOffers;
