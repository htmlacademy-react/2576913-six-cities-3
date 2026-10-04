import {Offers} from '../../types/offers';
import {NameSpace} from '../../const';
import {RootState} from '../../types/store';

export const getOffers = (state: RootState): Offers => state[NameSpace.Data].offers;

export const getOffersDataLoadingStatus = (state: RootState): boolean => state[NameSpace.Data].isOffersDataLoading;
