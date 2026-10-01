import type {TypedUseSelectorHook} from 'react-redux';
import {useDispatch, useSelector, useStore} from 'react-redux';
import type {store} from '../store';
import type {AppDispatch, RootState} from '../types/store';

const useAppDispatch = useDispatch<AppDispatch>;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppStore: () => typeof store = useStore;

export {useAppDispatch, useAppSelector, useAppStore};
