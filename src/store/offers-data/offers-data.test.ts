import { replaceOffer, offersData } from './offers-data';
import { makeFakeOffer } from '../../utils/mocks';
import { toggleFavoriteAction } from '../api-actions';

describe('OffersData Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const mockOffer = makeFakeOffer();
    const expectedState = {
      offers: [mockOffer],
      isOffersDataLoading: false,
    };

    const result = offersData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      isOffersDataLoading: false,
    };

    const result = offersData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should replace offer with "replaceOffer" action', () => {
    const firstMockOffer = makeFakeOffer();
    const secondMockOffer = makeFakeOffer();
    const initialState = {
      offers: [firstMockOffer],
      isOffersDataLoading: false,
    };
    const expectedOffers = [secondMockOffer];

    const result = offersData.reducer(initialState, replaceOffer(secondMockOffer));

    expect(result.offers).toEqual(expectedOffers);
  });

  it('should update offers when "toggleFavoriteAction" is fulfilled', () => {
    const mockOffer = makeFakeOffer();
    const updatedOffer = {...mockOffer, isFavorite: true};
    const initialState = {
      offers: [mockOffer],
      isOffersDataLoading: false,
    };

    const result = offersData.reducer(initialState, toggleFavoriteAction.fulfilled(
      {offer: updatedOffer, status: true},
      'request-id',
      {offerId: mockOffer.id, status: true},
    ));

    expect(result.offers).toEqual([updatedOffer]);
  });
});
