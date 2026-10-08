import { NameSpace } from '../../const';
import { getOffers, getOffersDataLoadingStatus } from './selectors';
import { makeFakeOffer } from '../../utils/mocks';

describe('OffersData selectors', () => {
  const mockOffer = makeFakeOffer();
  const state = {
    [NameSpace.Data]: {
      offers: [mockOffer],
      isOffersDataLoading: true,
    }
  };

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Data];
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return offers data loading status from state', () => {
    const { isOffersDataLoading } = state[NameSpace.Data];
    const result = getOffersDataLoadingStatus(state);
    expect(result).toBe(isOffersDataLoading);
  });
});
