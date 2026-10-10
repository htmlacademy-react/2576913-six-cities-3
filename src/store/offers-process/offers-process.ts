import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, CITIES} from '../../const';
import {OffersProcess} from '../../types/store';
import {CityName} from '../../types/offers';

const initialState: OffersProcess = {
  city: CITIES[0].name,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload as CityName;
    },
  },
});

export const {setCity} = offersProcess.actions;
