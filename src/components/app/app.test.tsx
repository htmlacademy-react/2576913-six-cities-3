import {render, screen} from '@testing-library/react';
import App from './app';
import { withStore } from '../../utils/mock-component';
import {AuthorizationStatus, NameSpace} from '../../const';

vi.mock('../../pages/main-page/main-page', () => ({
  default: () => <div>MainPage</div>,
}));
vi.mock('../../pages/login-page/login-page', () => ({
  default: () => <div>LoginPage</div>,
}));
vi.mock('../../pages/favorites-page/favorites-page', () => ({
  default: () => <div>FavoritesPage</div>,
}));
vi.mock('../../pages/offer-page/offer-page', () => ({
  default: () => <div>OfferPage</div>,
}));
vi.mock('../../pages/not-found-page/not-found-page', () => ({
  default: () => <div>NotFoundPage</div>,
}));

describe('Application Routing', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('should render "MainPage" when user navigate to route "/"', () => {
    render(withStore(<App />, {
      [NameSpace.Data]: {offers: [], isOffersDataLoading: false},
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
        favoritesOffers: [],
      },
      [NameSpace.Offers]: {city: 'Paris'},
    }).withStoreComponent);

    expect(screen.getByText('MainPage')).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to route "/login"', () => {
    window.history.replaceState({}, '', '/login');

    render(withStore(<App />, {
      [NameSpace.Data]: {offers: [], isOffersDataLoading: false},
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
        favoritesOffers: [],
      },
      [NameSpace.Offers]: {city: 'Paris'},
    }).withStoreComponent);

    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when authorized user navigate to route "/favorites"', () => {
    window.history.replaceState({}, '', '/favorites');

    render(withStore(<App />, {
      [NameSpace.Data]: {offers: [], isOffersDataLoading: false},
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
        favoritesOffers: [],
      },
      [NameSpace.Offers]: {city: 'Paris'},
    }).withStoreComponent);

    expect(screen.getByText('FavoritesPage')).toBeInTheDocument();
  });

  it('should redirect unauthorized user from "/favorites" to "/login"', () => {
    window.history.replaceState({}, '', '/favorites');

    render(withStore(<App />, {
      [NameSpace.Data]: {offers: [], isOffersDataLoading: false},
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
        favoritesOffers: [],
      },
      [NameSpace.Offers]: {city: 'Paris'},
    }).withStoreComponent);

    expect(screen.getByText('LoginPage')).toBeInTheDocument();
    expect(screen.queryByText('FavoritesPage')).not.toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigate to route "/offer/:id"', () => {
    window.history.replaceState({}, '', '/offer/test-id');

    render(withStore(<App />, {
      [NameSpace.Data]: {offers: [], isOffersDataLoading: false},
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
        favoritesOffers: [],
      },
      [NameSpace.Offers]: {city: 'Paris'},
    }).withStoreComponent);

    expect(screen.getByText('OfferPage')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" for unknown route', () => {
    window.history.replaceState({}, '', '/unknown');

    render(withStore(<App />, {
      [NameSpace.Data]: {offers: [], isOffersDataLoading: false},
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
        favoritesOffers: [],
      },
      [NameSpace.Offers]: {city: 'Paris'},
    }).withStoreComponent);

    expect(screen.getByText('NotFoundPage')).toBeInTheDocument();
  });
});
