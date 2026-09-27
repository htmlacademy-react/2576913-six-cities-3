import {Offer} from '../types/offers';

export const offers: Offer[] = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'img/apartment-01.jpg',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 3,
    goods: [
      'Heating',
    ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar.svg',
      isPro: false,
    },
    images: [
      'img/apartment-01.jpg',
    ],
    maxAdults: 4,
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f01',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 140,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: true,
    rating: 5,
    previewImage: 'img/apartment-02.jpg',
    description: 'A Canal View Prinsengracht quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 2,
    goods: [
      'Heating',
      'Wi-Fi',
      'Cleaner',
    ],
    host: {
      name: 'Jack Nord',
      avatarUrl: 'img/avatar.svg',
      isPro: true,
    },
    images: [
      'img/apartment-02.jpg',
      'img/apartment-01.jpg'
    ],
    maxAdults: 4,
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f11',
    title: 'Wood and stone place',
    type: 'room',
    price: 100,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3,
    previewImage: 'img/room.jpg',
    description: 'Wood and stone place quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 4,
    goods: [
      'Heating',
      'Wi-Fi',
    ],
    host: {
      name: 'Jonn Crash',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    images: [
      'img/room.jpg',
    ],
    maxAdults: 4,
  },
  {
    id: '2af6f711-c28d-4121-82cd-e0b462a27f11',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'house',
    price: 150,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: false,
    rating: 5,
    previewImage: 'img/apartment-03.jpg',
    description: 'Wood and stone place quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 1,
    goods: [
      'Heating',
      'Wi-Fi',
      'Super House',
      'Goog freezer',
    ],
    host: {
      name: 'Angelina Warn',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    images: [
      'img/apartment-03.jpg',
      'img/room.jpg',
      'img/apartment-01.jpg',
    ],
    maxAdults: 4,
  },
];
