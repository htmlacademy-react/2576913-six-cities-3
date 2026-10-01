type HouseType = 'apartment' | 'room' | 'house' | 'hotel';

export type CityName = 'Amsterdam' | 'Paris' | 'Cologne' | 'Brussels' | 'Hamburg' | 'Dusseldorf';

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: CityName;
  location: Location;
};

type Rating = 1 | 2 | 3 | 4 | 5;

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Offer = {
  id: string;
  title: string;
  type: HouseType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: Rating;
  previewImage: string;
};

export type Offers = Offer[];
