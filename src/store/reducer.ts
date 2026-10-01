import {createReducer} from '@reduxjs/toolkit';
import {setCity, setOffers, setOffersDataLoadingStatus} from './action';
import {CityName, Offers} from '../types/offers';
import {CITIES} from '../const';

type OffersState = {
  city: CityName;
  offers: Offers;
  isOffersDataLoading: boolean;
};

const initialState: OffersState = {
  city: CITIES[0].name,
  offers: [],
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload as unknown as CityName;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
