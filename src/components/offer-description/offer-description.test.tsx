import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeFakeOfferInfo } from '../../utils/mocks';
import OfferDescription from './offer-description';

describe('Component: OfferDescription', () => {
  it('should render correctly', () => {
    const mockOfferInfo = makeFakeOfferInfo();

    render(<OfferDescription offer={mockOfferInfo} onFavoriteClick={() => Promise.resolve(true)} />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: mockOfferInfo.title})).toBeInTheDocument();
    expect(screen.getByText(`€${mockOfferInfo.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOfferInfo.type)).toBeInTheDocument();
    expect(screen.getByRole('img', {name: 'Host avatar'})).toHaveAttribute('src', mockOfferInfo.host.avatarUrl);
    expect(screen.getByText(mockOfferInfo.host.name)).toBeInTheDocument();
    expect(screen.getByText(mockOfferInfo.description)).toBeInTheDocument();
  });

  it('should toggle favorite when onFavoriteClick resolves to true', async () => {
    const mockOfferInfo = makeFakeOfferInfo();
    const onFavoriteClick = vi.fn().mockResolvedValue(true);
    const user = userEvent.setup();

    render(<OfferDescription offer={mockOfferInfo} onFavoriteClick={onFavoriteClick} />);

    const bookmarkButton = screen.getByRole('button', {name: 'To bookmarks'});
    expect(bookmarkButton).not.toHaveClass('offer__bookmark-button--active');

    await user.click(bookmarkButton);

    expect(onFavoriteClick).toHaveBeenCalledWith(mockOfferInfo.id, true);
    await waitFor(() => {
      expect(bookmarkButton).toHaveClass('offer__bookmark-button--active');
    });
  });
});
