import { render, screen } from '@testing-library/react';
import {withStore, withRouter} from '../../utils/mock-component';
import { APIRoute, AuthorizationStatus, NameSpace } from '../../const';
import { extractActionsTypes, makeFakeOffer } from '../../utils/mocks';
import Header from './header';
import userEvent from '@testing-library/user-event';
import {loginAction, logoutAction} from '../../store/api-actions';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {rootReducer} from '../../store/root-reducer';
import PrivateRoute from '../private-route/private-route';
import LoginPage from '../../pages/login-page/login-page';

describe('Component: Header', () => {
  it('should render correctly when user is not authorized', () => {
    const initialState = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
        favoritesOffers: [],
      },
    };
    const { withStoreComponent } = withStore(
      withRouter(<Header />),
      initialState
    );
    const headerTestId = 'header';
    const expectedText = 'Sign in';

    render(withStoreComponent);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when user is authorized', () => {
    const initialState = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: {
          name: 'test',
          email: 'test@test.com',
          avatarUrl: 'https://avatar.jpg',
          token: 'secret',
          isPro: false,
        },
        favoritesOffers: [],
      },
    };
    const { withStoreComponent } = withStore(
      withRouter(<Header />),
      initialState
    );
    const headerTestId = 'header';
    const expectedText = initialState[NameSpace.User].userData.email;
    const expectedSignOutText = 'Sign out';

    render(withStoreComponent);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedSignOutText)).toBeInTheDocument();
  });

  it('should render correctly favorite offers count', () => {
    const initialState = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: {
          name: 'test',
          email: 'test@test.com',
          avatarUrl: 'https://avatar.jpg',
          token: 'secret',
          isPro: false,
        },
        favoritesOffers: [makeFakeOffer()],
      },
    };
    const { withStoreComponent } = withStore(
      withRouter(<Header />),
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByText(initialState[NameSpace.User].favoritesOffers.length)).toBeInTheDocument();
  });

  it('should dispatch "logoutAction" when user clicked sign out button', async() => {
    const signOutTestId = 'logoutButton';
    const initialState = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: {
          name: 'test',
          email: 'test@test.com',
          avatarUrl: 'https://avatar.jpg',
          token: 'secret',
          isPro: false,
        },
        favoritesOffers: [],
      },
    };
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withRouter(<Header />),
      initialState
    );
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(signOutTestId));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);
  });

  it('should show sign in and keep the main page after successful logout', async() => {
    const api = createAPI();
    const mockAxiosAdapter = new MockAdapter(api);
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });
    const userData = {
      name: 'test',
      email: 'test@test.com',
      avatarUrl: 'https://avatar.jpg',
      token: 'secret',
      isPro: false,
    };
    store.dispatch(loginAction.fulfilled(userData, 'login-request', {email: userData.email, password: 'password'}));
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<><Header /><div>Main page</div></>} />
            <Route path="/login" element={<div>Login page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    await userEvent.click(screen.getByTestId('logoutButton'));

    expect(await screen.findByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Main page')).toBeInTheDocument();
    expect(screen.queryByText('Login page')).not.toBeInTheDocument();
  });

  it('should redirect from favorites to login after successful logout', async() => {
    const api = createAPI();
    const mockAxiosAdapter = new MockAdapter(api);
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });
    const userData = {
      name: 'test',
      email: 'test@test.com',
      avatarUrl: 'https://avatar.jpg',
      token: 'secret',
      isPro: false,
    };
    store.dispatch(loginAction.fulfilled(userData, 'login-request', {email: userData.email, password: 'password'}));
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

    render(
      <HelmetProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/favorites']}>
            <Routes>
              <Route
                path="/favorites"
                element={
                  <PrivateRoute>
                    <>
                      <Header />
                      <div>Favorites page</div>
                    </>
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </HelmetProvider>
    );
    await userEvent.click(screen.getByTestId('logoutButton'));

    expect(await screen.findByTestId('loginPage')).toBeInTheDocument();
    expect(screen.queryByText('Favorites page')).not.toBeInTheDocument();
  });
});
