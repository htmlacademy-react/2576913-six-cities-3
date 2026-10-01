import {Reviews} from '../types/reviews';

export const reviews: Reviews = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: '/img/avatar.svg',
      isPro: false,
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4,
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62b',
    date: '2019-06-08T14:13:56.569Z',
    user: {
      name: 'Angelina',
      avatarUrl: '/img/avatar-angelina.jpg',
      isPro: true,
    },
    comment: 'Good place!',
    rating: 5,
  },
];
