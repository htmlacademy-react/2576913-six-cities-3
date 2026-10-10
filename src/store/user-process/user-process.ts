import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {AuthorizationStatus, NameSpace} from '../../const';
import {UserProcess} from '../../types/store';
import {Offer} from '../../types/offers';
import {checkAuthAction, loginAction, logoutAction, fetchFavoritesOffers, toggleFavoriteAction} from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  favoritesOffers: [],
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setFavoriteOffer: (state, action: PayloadAction<{offer: Offer; status: boolean}>) => {
      if (action.payload.status) {
        state.favoritesOffers.push(action.payload.offer);
      } else {
        state.favoritesOffers = state.favoritesOffers.filter(({id}) => id !== action.payload.offer.id);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        if (state.authorizationStatus !== AuthorizationStatus.Unknown) {
          return;
        }
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        if (state.authorizationStatus !== AuthorizationStatus.Unknown) {
          return;
        }
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        toast.warn('You are not logged!');
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        toast.error('Failed to login!');
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })
      .addCase(fetchFavoritesOffers.fulfilled, (state, action) => {
        state.favoritesOffers = action.payload;
      })
      .addCase(fetchFavoritesOffers.rejected, () => {
        toast.warn('You are not logged! Failed to load favorites offers!');
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.favoritesOffers.push(action.payload.offer);
        } else {
          state.favoritesOffers = state.favoritesOffers.filter(({id}) => id !== action.payload.offerId);
        }
      });
  }
});

export const {setFavoriteOffer} = userProcess.actions;
