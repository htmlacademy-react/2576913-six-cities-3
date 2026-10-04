import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {AuthorizationStatus, NameSpace} from '../../const';
import {UserProcess} from '../../types/store';
import {checkAuthAction, loginAction, logoutAction, fetchFavoritesOffers} from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  favoritesOffers: [],
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
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
      });
  }
});
