import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { withStore } from '../../utils/mock-component';
import { APIRoute, AuthorizationStatus, NameSpace } from '../../const';
import { extractActionsTypes, makeFakeOffer } from '../../utils/mocks';
import Header from './header';
import userEvent from '@testing-library/user-event';
import { logoutAction } from '../../store/api-actions';

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
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
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
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
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
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
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
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
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
});
