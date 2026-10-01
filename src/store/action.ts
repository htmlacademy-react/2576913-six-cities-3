import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/offers';

export const setCity = createAction('offers/setCity');

export const setOffers = createAction<Offers>('data/setOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
