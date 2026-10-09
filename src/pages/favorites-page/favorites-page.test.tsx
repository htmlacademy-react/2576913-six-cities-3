import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { NameSpace, AuthorizationStatus } from '../../const';
import { RootState } from '../../types/store';
import { makeFakeOffer } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';
import FavoritesPage from './favorites-page';

describe('Page: FavoritesPage', () => {
  it('should render correctly when there are no favorite offers', () => {
    const initialState: Partial<RootState> = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
        favoritesOffers: [],
      },
      [NameSpace.Data]: {
        offers: [],
        isOffersDataLoading: false,
      },
    };
    const {withStoreComponent} = withStore(<FavoritesPage />, initialState);

    render(
      <HelmetProvider>
        <MemoryRouter>
          {withStoreComponent}
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
    expect(screen.queryByText('Saved listing')).not.toBeInTheDocument();
  });

  it('should render favorite offers', () => {
    const offer = makeFakeOffer();
    const initialState: Partial<RootState> = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
        favoritesOffers: [offer],
      },
      [NameSpace.Data]: {
        offers: [offer],
        isOffersDataLoading: false,
      },
    };
    const {withStoreComponent} = withStore(<FavoritesPage />, initialState);

    render(
      <HelmetProvider>
        <MemoryRouter>
          {withStoreComponent}
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('heading', {name: 'Saved listing'})).toBeInTheDocument();
    expect(screen.getByText(offer.city.name)).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: offer.title})).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveClass('favorites__card');
    expect(screen.queryByText('Nothing yet saved.')).not.toBeInTheDocument();
  });
});
