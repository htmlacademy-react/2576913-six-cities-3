import type {store} from '../store';
import {AuthorizationStatus} from '../const';
import {UserData} from './user-data';
import {Offers, CityName} from './offers';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type OffersProcess = {
  city: CityName;
};

export type OffersData = {
  offers: Offers;
  isOffersDataLoading: boolean;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
