import { system, datatype, random } from 'faker';
import { Offer } from '../types/offers';

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
