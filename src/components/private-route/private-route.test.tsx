import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {AuthorizationStatus, NameSpace} from '../../const';
import {RootState} from '../../types/store';
import {withStore} from '../../utils/mock-component';
import LoginPage from '../../pages/login-page/login-page';
import PrivateRoute from './private-route';

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
});
