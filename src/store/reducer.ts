import {createReducer} from '@reduxjs/toolkit';
import {setCity} from './action';
import {offers} from '../mocks/offers';
import {CityName, Offers} from '../types/offers';
import {CITIES} from '../const';

type OffersState = {
  city: CityName;
  offers: Offers;
};

const initialState: OffersState = {
  city: CITIES[0].name,
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload as unknown as CityName;
    });
});

export {reducer};
