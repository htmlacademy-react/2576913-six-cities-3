import {Offers} from '../../types/offers';
import {NameSpace} from '../../const';
import {RootState} from '../../types/store';

export const getOffers = (state: Pick<RootState, NameSpace.Data>): Offers => state[NameSpace.Data].offers;

export const getOffersDataLoadingStatus = (state: Pick<RootState, NameSpace.Data>): boolean => state[NameSpace.Data].isOffersDataLoading;
