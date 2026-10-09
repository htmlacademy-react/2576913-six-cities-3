import {render, screen, waitFor} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import type {AxiosInstance} from 'axios';
import type MockAdapter from 'axios-mock-adapter';
import {NameSpace, AuthorizationStatus, APIRoute} from '../../const';
import {RootState} from '../../types/store';
import {makeFakeOffer, makeFakeOfferInfo, makeFakeReview} from '../../utils/mocks';
import {withStore} from '../../utils/mock-component';
import * as apiService from '../../services/api';
import OfferPage from './offer-page';

vi.mock('../../components/map/map', () => ({
  default: () => <div data-testid="map" />,
}));
vi.mock('../../components/scroll-to-top/scroll-to-top', () => ({
  default: () => null,
}));

describe('Page: OfferPage', () => {
  let api: AxiosInstance;

  beforeEach(() => {
    api = apiService.createAPI();
    vi.spyOn(apiService, 'createAPI').mockReturnValue(api);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function renderOfferPage(offerId: string, setupRequests: (adapter: MockAdapter) => void) {
    const offer = makeFakeOffer();
    offer.id = offerId;

    const initialState: Partial<RootState> = {
      [NameSpace.Offers]: {city: 'Paris'},
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
        favoritesOffers: [],
      },
      [NameSpace.Data]: {
        offers: [offer],
        isOffersDataLoading: false,
      },
    };
    const {withStoreComponent, mockAxiosAdapter} = withStore(
      <OfferPage />,
      initialState
    );

    setupRequests(mockAxiosAdapter);

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[`/offer/${offerId}`]}>
          <Routes>
            <Route path="/offer/:id" element={withStoreComponent} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    return mockAxiosAdapter;
  }

  it('should render offer page after all requests succeed', async () => {
    const offerId = 'test-offer';
    const offer = makeFakeOfferInfo();
    offer.id = offerId;
    const review = makeFakeReview();
    const nearbyOffer = {...makeFakeOffer(), id: 'nearby-offer', title: 'Nearby offer'};
    renderOfferPage(offerId, (mockAxiosAdapter) => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(200, offer);
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, [review]);
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(200, [nearbyOffer]);
    });

    expect(await screen.findByRole('heading', {name: offer.title})).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Other places in the neighbourhood'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Nearby offer'})).toBeInTheDocument();
  });

  it('should keep the loader visible when any request fails', async () => {
    const offerId = 'test-offer';
    const offer = makeFakeOfferInfo();
    offer.id = offerId;
    const nearbyOffer = {...makeFakeOffer(), id: 'nearby-offer'};
    let mockAxiosAdapter: MockAdapter;
    renderOfferPage(offerId, (adapter) => {
      mockAxiosAdapter = adapter;
      adapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(200, offer);
      adapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(500);
      adapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(200, [nearbyOffer]);
    });

    await waitFor(() => {
      expect(mockAxiosAdapter!.history.get).toHaveLength(3);
      expect(screen.queryByRole('main')).not.toBeInTheDocument();
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  it('should render NotFoundPage when the offer does not exist', async () => {
    const offerId = 'missing-offer';
    const review = makeFakeReview();
    const nearbyOffer = {...makeFakeOffer(), id: 'nearby-offer'};
    renderOfferPage(offerId, (mockAxiosAdapter) => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(404);
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, [review]);
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(200, [nearbyOffer]);
    });

    expect(await screen.findByText('404. Offer with this ID not found')).toBeInTheDocument();
  });
});
