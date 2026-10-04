import {NameSpace} from '../../const';
import {RootState} from '../../types/store';
import {CityName} from '../../types/offers';

export const getCurrentCity = (state: RootState): CityName => state[NameSpace.Offers].city;
