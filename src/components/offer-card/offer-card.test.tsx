import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';
import { makeFakeOffer } from '../../utils/mocks';
import OfferCard from './offer-card';

describe('Component: OfferCard', () => {
  it('should render correctly', () => {
    const mockOffer = makeFakeOffer();

    render(
      <MemoryRouter>
        <OfferCard
          offer={mockOffer}
          offerType="city"
          onHover={() => undefined}
          onFavoriteClick={() => Promise.resolve(true)}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('article')).toHaveClass('place-card', 'cities__card');
    expect(screen.getByRole('heading', {name: mockOffer.title})).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByRole('img', {name: 'Place image'})).toHaveAttribute('src', mockOffer.previewImage);
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should pass the hovered offer to onHover', async () => {
    const mockOffer = makeFakeOffer();
    const onHover = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <OfferCard
          offer={mockOffer}
          offerType="city"
          onHover={onHover}
          onFavoriteClick={() => Promise.resolve(true)}
        />
      </MemoryRouter>
    );

    await user.hover(screen.getByRole('article'));

    expect(onHover).toHaveBeenCalledWith(mockOffer);
  });

  it('should call onHover without an offer when the pointer leaves', async () => {
    const mockOffer = makeFakeOffer();
    const onHover = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <OfferCard
          offer={mockOffer}
          offerType="city"
          onHover={onHover}
          onFavoriteClick={() => Promise.resolve(true)}
        />
      </MemoryRouter>
    );

    const renderedCard = screen.getByRole('article');
    await user.hover(renderedCard);
    onHover.mockClear();
    await user.unhover(renderedCard);

    expect(onHover).toHaveBeenCalledWith();
  });

  it('should toggle favorite when onFavoriteClick resolves to true', async () => {
    const mockOffer = makeFakeOffer();
    const onFavoriteClick = vi.fn().mockResolvedValue(true);
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <OfferCard
          offer={mockOffer}
          offerType="city"
          onHover={() => undefined}
          onFavoriteClick={onFavoriteClick}
        />
      </MemoryRouter>
    );

    const bookmarkButton = screen.getByRole('button', {name: 'To bookmarks'});
    expect(bookmarkButton).not.toHaveClass('place-card__bookmark-button--active');

    await user.click(bookmarkButton);

    expect(onFavoriteClick).toHaveBeenCalledWith(mockOffer.id, true);
    await waitFor(() => {
      expect(bookmarkButton).toHaveClass('place-card__bookmark-button--active');
    });
  });
});
