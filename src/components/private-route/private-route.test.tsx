import {act, render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {AuthorizationStatus, NameSpace} from '../../const';
import {RootState} from '../../types/store';
import {withStore} from '../../utils/mock-component';
import LoginPage from '../../pages/login-page/login-page';
import PrivateRoute from './private-route';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {rootReducer} from '../../store/root-reducer';
import {checkAuthAction} from '../../store/api-actions';

describe('Component: PrivateRoute', () => {
  const renderWithAuthorizationStatus = (authorizationStatus: AuthorizationStatus) => {
    const initialState: Partial<RootState> = {
      [NameSpace.User]: {
        authorizationStatus,
        userData: null,
        favoritesOffers: [],
      },
    };
    const {withStoreComponent} = withStore(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/favorites']}>
          <Routes>
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <div>Favorites content</div>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
      initialState
    );

    render(withStoreComponent);
  };

  it('should render children when the user is authorized', () => {
    renderWithAuthorizationStatus(AuthorizationStatus.Auth);

    expect(screen.getByText('Favorites content')).toBeInTheDocument();
    expect(screen.queryByRole('heading', {name: 'Sign in'})).not.toBeInTheDocument();
  });


  it('should render LoginPage when the user is not authorized', async () => {
    renderWithAuthorizationStatus(AuthorizationStatus.NoAuth);

    expect(await screen.findByRole('heading', {name: 'Sign in'})).toBeInTheDocument();
    expect(screen.queryByText('Favorites content')).not.toBeInTheDocument();
  });

  it('should wait for auth check before redirecting from favorites', async() => {
    const store = configureStore({reducer: rootReducer});

    render(
      <HelmetProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/favorites']}>
            <Routes>
              <Route
                path="/favorites"
                element={
                  <PrivateRoute>
                    <div>Favorites content</div>
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </HelmetProvider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByRole('heading', {name: 'Sign in'})).not.toBeInTheDocument();

    act(() => {
      store.dispatch(checkAuthAction.fulfilled({
        name: 'test',
        email: 'test@test.com',
        avatarUrl: 'https://avatar.jpg',
        token: 'secret',
        isPro: false,
      }, 'auth-check-request', undefined));
    });

    expect(await screen.findByText('Favorites content')).toBeInTheDocument();
    expect(screen.queryByRole('heading', {name: 'Sign in'})).not.toBeInTheDocument();
  });
});
