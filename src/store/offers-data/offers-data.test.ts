import { replaceOffer, offersData } from './offers-data';
import { makeFakeOffer } from '../../utils/mocks';

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
});
