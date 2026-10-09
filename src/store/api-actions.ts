import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {AppDispatch, RootState} from '../types/store';
import {Offer, OfferInfo, Offers} from '../types/offers';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {saveToken, dropToken} from '../services/token';
import {APIRoute} from '../const';

type FavoriteOfferPayload = {
  offer: Offer;
  status: boolean;
};

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

export const fetchFavoritesOffers = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/getFavoritesOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Favorite);
    return data;
  },
);

export const toggleFavoriteAction = createAsyncThunk<FavoriteOfferPayload, {
  offerId: string;
  status: boolean;
}, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
  rejectValue: string;
}>(
  'user/toggleFavorite',
  async ({offerId, status}, {extra: api, getState, rejectWithValue}) => {
    try {
      const {data} = await api.post<OfferInfo>(`${APIRoute.Favorite}/${offerId}/${Number(status)}`);
      const offer = getState().DATA.offers.find(({id}) => id === data.id);

      if (!offer) {
        throw new Error(`Offer ${data.id} was not found in the offers list.`);
      }

      return {
        offer: {
          ...structuredClone(offer),
          isFavorite: !offer.isFavorite,
        },
        status,
      };
    } catch {
      const message = status ? 'Failed to add to favorites!' : 'Failed to remove from favorites!';
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);
