import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {AppDispatch, RootState} from '../types/store';
import {Offers} from '../types/offers';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {saveToken, dropToken} from '../services/token';
import {APIRoute} from '../const';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
    } catch {
      toast.error('Logout failed!');
    }
  },
);
