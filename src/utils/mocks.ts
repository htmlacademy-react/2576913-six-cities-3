import { system, datatype, random, name, internet } from 'faker';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Offer, OfferInfo } from '../types/offers';
import { RootState } from '../types/store';
import { createAPI } from '../services/api';
import { Review } from '../types/reviews';

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

export const makeFakeOfferInfo = (): OfferInfo => ({
  id: 'id-code',
  title: random.words(),
  type: 'house',
  price: datatype.number(1000),
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
  description: random.words(),
  bedrooms: datatype.number(6),
  goods: ['Wi-Fi', 'Heating'],
  images: [system.filePath()],
  maxAdults: datatype.number(5),
  host: {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: false,
  },
});

export const makeFakeReview = (): Review => ({
  id: 'id-review',
  date: '2026-09-12T21:00:00.191Z',
  user: {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: false,
  },
  comment: random.words(),
  rating: 3,
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
