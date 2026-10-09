import { render, screen } from '@testing-library/react';
import { AuthorizationStatus, CITIES, NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import { withRouter } from '../../utils/mock-component';
import { withStore } from '../../utils/mock-component';
import OffersSection from './offers-section';
import { RootState } from '../../types/store';

describe('Component: OffersSection', () => {
  it('should render correctly without offers', () => {
    const expectedCity = CITIES[3];
    const noOffersText = 'No places to stay available';
    const expectedText = `We could not find any property available at the moment in ${expectedCity.name}`;
    const initialState: Partial<RootState> = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
        favoritesOffers: [],
      },
    };
    const { withStoreComponent } = withStore(
      withRouter(<OffersSection offers={[]} city={expectedCity} />),
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByText(noOffersText)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly with offers', () => {
    const mockOffers = [makeFakeOffer()];
    const expectedCity = CITIES[3];
    const expectedText = `${mockOffers.length} places to stay in ${expectedCity.name}`;
    const initialState: Partial<RootState> = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
        favoritesOffers: [],
      },
    };
    const { withStoreComponent } = withStore(
      withRouter(<OffersSection offers={mockOffers} city={expectedCity} />),
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
