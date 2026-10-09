import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from './not-found-page';

describe('Page: NotFoundPage', () => {
  it('should render correctly with page not found', () => {
    const expectedText = '404. Page not found';
    const preparedComponent = (
      <HelmetProvider>
        <MemoryRouter>
          <NotFoundPage type='page' />
        </MemoryRouter>
      </HelmetProvider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly with offer not found', () => {
    const expectedText = '404. Offer with this ID not found';
    const preparedComponent = (
      <HelmetProvider>
        <MemoryRouter>
          <NotFoundPage type='offer' />
        </MemoryRouter>
      </HelmetProvider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
