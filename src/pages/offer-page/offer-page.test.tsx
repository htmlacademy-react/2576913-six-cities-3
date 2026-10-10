import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  default: ({offers}: {offers: Array<{id: string}>}) => (
    <div data-testid="map" data-offer-ids={offers.map((offer) => offer.id).join(',')} />
  ),
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

  function renderOfferPage(
    offerId: string,
    setupRequests: (adapter: MockAdapter) => void,
    includeCurrentOfferInStore = true,
    authorizationStatus = AuthorizationStatus.NoAuth
  ) {
    const offer = makeFakeOffer();
    offer.id = offerId;

    const initialState: Partial<RootState> = {
      [NameSpace.Offers]: {city: 'Paris'},
      [NameSpace.User]: {
        authorizationStatus,
        userData: null,
        favoritesOffers: [],
      },
      [NameSpace.Data]: {
        offers: includeCurrentOfferInStore ? [offer] : [],
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

  it('should include the loaded offer in the map when the offers list is not loaded', async () => {
    const offerId = 'test-offer';
    const offer = makeFakeOfferInfo();
    offer.id = offerId;
    const nearbyOffer = {...makeFakeOffer(), id: 'nearby-offer'};
    renderOfferPage(offerId, (mockAxiosAdapter) => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(200, offer);
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, []);
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(200, [nearbyOffer]);
    }, false);

    expect(await screen.findByRole('heading', {name: offer.title})).toBeInTheDocument();
    expect(screen.getByTestId('map')).toHaveAttribute('data-offer-ids', 'nearby-offer,test-offer');
  });

  it('should keep the review count accurate when more than ten reviews are submitted', async () => {
    const user = userEvent.setup();
    const offerId = 'test-offer';
    const offer = makeFakeOfferInfo();
    offer.id = offerId;
    const existingReviews = Array.from({length: 12}, (_, index) => ({
      ...makeFakeReview(),
      id: `review-${index}`,
      comment: `Existing review ${index}`,
    }));
    const nearbyOffer = {...makeFakeOffer(), id: 'nearby-offer'};
    let submittedReviewCount = 0;
    renderOfferPage(offerId, (mockAxiosAdapter) => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(200, offer);
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, existingReviews);
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(200, [nearbyOffer]);
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${offerId}`).reply(() => {
        submittedReviewCount += 1;
        return [200, {...makeFakeReview(), id: `submitted-${submittedReviewCount}`, comment: 'New Comment'}];
      });
    }, true, AuthorizationStatus.Auth);

    expect(await screen.findByText('Existing review 0')).toBeInTheDocument();
    const commentField = screen.getByRole('textbox');

    for (let index = 1; index <= 2; index += 1) {
      await user.click(screen.getByTitle('perfect'));
      await user.type(commentField, 'A pleasant stay in a lovely apartment with a very helpful host.');
      await user.click(screen.getByRole('button', {name: 'Submit'}));
      expect(await screen.findByText(String(12 + index))).toBeInTheDocument();
      expect(screen.getAllByText('New Comment')).toHaveLength(index);
    }

    expect(screen.getAllByRole('listitem').filter((item) => item.classList.contains('reviews__item'))).toHaveLength(10);
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
