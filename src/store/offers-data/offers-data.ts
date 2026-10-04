import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {fetchOffersAction} from '../api-actions';

const initialState = {
  offers: [],
  isOffersDataLoading: false,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      });
  },
});
