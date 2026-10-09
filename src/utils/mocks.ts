import { system, datatype, random } from 'faker';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Offer } from '../types/offers';
import { RootState } from '../types/store';
import { createAPI } from '../services/api';

export type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createAPI>, Action>;

export const makeFakeOffer = (): Offer => ({
  id: 'id-code',
  title: random.words(),
  type: 'house',
  price: datatype.number(1000),
  previewImage: system.filePath(),
  city: {
    name: 'Paris',
    location: {
      latitude: datatype.float(),
      longitude: datatype.float(),
      zoom: datatype.number(20),
    }
  },
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: datatype.number(20),
  },
  isFavorite: false,
  isPremium: true,
  rating: 5,
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
