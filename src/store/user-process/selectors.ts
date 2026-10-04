import {RootState} from '../../types/store';
import {NameSpace, AuthorizationStatus} from '../../const';
import {UserData} from '../../types/user-data';

export const getAuthorizationStatus = (state: RootState): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getUserData = (state: RootState): UserData | null => state[NameSpace.User].userData;
