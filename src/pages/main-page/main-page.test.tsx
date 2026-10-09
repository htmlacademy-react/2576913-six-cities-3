import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { withStore } from '../../utils/mock-component';
import { makeFakeOffer } from '../../utils/mocks';
import { NameSpace, AuthorizationStatus } from '../../const';
import MainPage from './main-page';
import { RootState } from '../../types/store';

describe('Page: MainPage', () => {
  it('should render correctly with offers', () => {
    const mainPageTestId = 'mainPage';
    const mainPageContainerTestId = 'mainPageContainer';
    const initialState: Partial<RootState> = {
      [NameSpace.Data]: {
        offers: [makeFakeOffer()],
        isOffersDataLoading: false,
      },
      [NameSpace.Offers]: {
        city: 'Paris',
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
        favoritesOffers: [],
      },
    };
    const { withStoreComponent } = withStore(
      <HelmetProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </HelmetProvider>,
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByTestId(mainPageTestId)).toBeInTheDocument();
    expect(screen.getByTestId(mainPageContainerTestId)).toBeInTheDocument();
    expect(screen.getByText('Cities')).toBeInTheDocument();
  });

  it('should render correctly without offers', () => {
    const mainPageTestId = 'mainPage';
    const mainPageContainerTestId = 'mainPageContainer';
    const initialState: Partial<RootState> = {
      [NameSpace.Data]: {
        offers: [],
        isOffersDataLoading: false,
      },
      [NameSpace.Offers]: {
        city: 'Paris',
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
        favoritesOffers: [],
      },
    };
    const { withStoreComponent } = withStore(
      <HelmetProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </HelmetProvider>,
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByTestId(mainPageTestId)).toBeInTheDocument();
    expect(screen.getByTestId(mainPageContainerTestId)).toHaveClass('page__main--index-empty');
    expect(screen.getByText('Cities')).toBeInTheDocument();
  });
});
