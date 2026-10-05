import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {NameSpace} from '../../const';
import {OffersData} from '../../types/store';
import {fetchOffersAction} from '../api-actions';

const initialState: OffersData = {
  offers: [],
  isOffersDataLoading: false,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    replaceOffer: (state, action: PayloadAction<OffersData['offers'][number]>) => {
      const foundIndex = state.offers.findIndex(({id}) => id === action.payload.id);
      state.offers[foundIndex] = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        toast.error('Failed to load offers!');
      });
  },
});

export const {replaceOffer} = offersData.actions;
