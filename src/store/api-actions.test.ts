import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { internet } from 'faker';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { createAPI } from '../services/api';
import { RootState } from '../types/store';
import { AppThunkDispatch, extractActionsTypes, makeFakeOffer } from '../utils/mocks';
import { APIRoute } from '../const';
import { checkAuthAction, fetchFavoritesOffers, fetchOffersAction, loginAction, logoutAction } from './api-actions';
import { AuthData } from '../types/auth-data';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middlewares);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      DATA: {
        offers: [],
      },
      USER: {
        favoritesOffers: [],
      },
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction"', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchQuestionsAction.pending", "fetchQuestionAction.fulfilled", when server response 200', async() => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchQuestionAction.pending", "fetchQuestionAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoritesOffers', () => {
    it('should dispatch "fetchFavoritesOffers.pending", "fetchFavoritesOffers.fulfilled", when server response 200', async() => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockOffers);

      await store.dispatch(fetchFavoritesOffers());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);
      const fetchfavoritesOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesOffers.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchFavoritesOffers.pending.type,
        fetchFavoritesOffers.fulfilled.type,
      ]);
      expect(fetchfavoritesOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchFavoritesOffers.pending", "fetchFavoritesOffers.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(fetchFavoritesOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesOffers.pending.type,
        fetchFavoritesOffers.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending" and "loginAction.fulfilled" when server response 200', async() => {
      const fakeUser: AuthData = { email: 'test@test.com', password: 'password' };
      const fakeServerReplay = {
        email: fakeUser.email,
        token: 'secret',
        name: 'test',
        avatarUrl: internet.avatar(),
        isPro: false,
      };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async() => {
      const fakeUser: AuthData = { email: 'test@test.com', password: 'password' };
      const fakeServerReplay = {
        email: fakeUser.email,
        token: 'secret',
        name: 'test',
        avatarUrl: internet.avatar(),
        isPro: false,
      };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
