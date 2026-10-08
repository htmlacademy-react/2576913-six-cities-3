import { system } from 'faker';
import { Offer } from '../types/offers';

export const makeFakeOffer = (): Offer => ({
  id: '31c26c6c-076b-4159-a0c3-170d9585a5d5',
  title: 'Waterfront with extraordinary view',
  type: 'house',
  price: 824,
  previewImage: system.filePath(),
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    }
  },
  location: {
    latitude: 48.85661,
    longitude: 2.342499,
    zoom: 16,
  },
  isFavorite: false,
  isPremium: true,
  rating: 4,
});
