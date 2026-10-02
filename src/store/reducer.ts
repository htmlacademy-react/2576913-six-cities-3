import {createReducer} from '@reduxjs/toolkit';
import {setCity, setOffers, setOffersDataLoadingStatus, requireAuthorization, setUserData} from './action';
import {CityName, Offers} from '../types/offers';
import {UserData} from '../types/user-data';
import {CITIES, AuthorizationStatus} from '../const';

type OffersState = {
  city: CityName;
  offers: Offers;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

const initialState: OffersState = {
  city: CITIES[0].name,
  offers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export {reducer};
