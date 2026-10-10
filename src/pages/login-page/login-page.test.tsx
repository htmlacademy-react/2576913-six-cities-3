import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore, withRouter } from '../../utils/mock-component';
import LoginPage from './login-page';
import { HelmetProvider } from 'react-helmet-async';
import { NameSpace, AuthorizationStatus, APIRoute } from '../../const';
import { RootState } from '../../types/store';

describe('Page: LoginPage', () => {
  it('should render correctly', () => {
    const initialState: Partial<RootState> = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
        favoritesOffers: [],
      }
    };
    const loginPageTestId = 'loginPage';
    const { withStoreComponent } = withStore(withRouter(<LoginPage />), initialState);
    const preparedComponent = (
      <HelmetProvider>
        {withStoreComponent}
      </HelmetProvider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(loginPageTestId)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const initialState: Partial<RootState> = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
        favoritesOffers: [],
      },
    };
    const emailElementTestId = 'emailElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'keks';
    const expectedPasswordValue = '123456';
    const { withStoreComponent } = withStore(
      <HelmetProvider>
        {withRouter(<LoginPage />)}
      </HelmetProvider>,
      initialState
    );

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId(emailElementTestId),
      expectedLoginValue
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });

  it('should load favorites after successful login', async () => {
    const initialState: Partial<RootState> = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
        favoritesOffers: [],
      },
    };
    const {withStoreComponent, mockAxiosAdapter} = withStore(
      <HelmetProvider>
        {withRouter(<LoginPage />)}
      </HelmetProvider>,
      initialState
    );
    mockAxiosAdapter.onPost(APIRoute.Login).reply(200, {
      name: 'Test user',
      email: 'test@example.com',
      avatarUrl: 'https://avatar.jpg',
      isPro: false,
      token: 'test-token',
    });
    mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, []);

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId('emailElement'), 'test@example.com');
    await userEvent.type(screen.getByTestId('passwordElement'), 'a1');
    await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));

    await waitFor(() => {
      expect(mockAxiosAdapter.history.post).toHaveLength(1);
      expect(mockAxiosAdapter.history.get).toHaveLength(1);
      expect(mockAxiosAdapter.history.get[0].url).toBe(APIRoute.Favorite);
    });
  });
});
