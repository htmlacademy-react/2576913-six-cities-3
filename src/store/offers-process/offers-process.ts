import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, CITIES} from '../../const';
import {Offer} from '../../types/offers';

const initialState = {
  city: CITIES[0].name,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const {setCity} = offersProcess.actions;
