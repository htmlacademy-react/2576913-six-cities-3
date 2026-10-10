import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {offersData} from './offers-data/offers-data';
import {offersProcess} from './offers-process/offers-process';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Data]: offersData.reducer,
});
