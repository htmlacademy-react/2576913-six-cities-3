import {City} from './types/offers';

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

enum APIRoute {
  Offers = '/offers',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const URL_MARKER_DEFAULT = '/img/pin.svg';
const URL_MARKER_ACTIVE = '/img/pin-active.svg';

const CITIES: readonly City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 8,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.9333,
      longitude: 6.95,
      zoom: 8,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.8504,
      longitude: 4.34878,
      zoom: 8,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.374,
      longitude: 4.88969,
      zoom: 8,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.5510846,
      longitude: 9.9936818,
      zoom: 8,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2166,
      longitude: 6.8166,
      zoom: 8,
    },
  },
];

enum SortingType {
  Default = 'POPULAR',
  PriceLow = 'CHEAP',
  PriceHigh = 'EXPENSIVE',
  Rating = 'RATING',
}

export {AppRoute, APIRoute, AuthorizationStatus, URL_MARKER_ACTIVE, URL_MARKER_DEFAULT, CITIES, SortingType};
