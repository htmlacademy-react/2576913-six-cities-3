import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from './not-found-page';
import { withRouter } from '../../utils/mock-component';

describe('Page: NotFoundPage', () => {
  it('should render correctly with page not found', () => {
    const expectedText = '404. Page not found';
    const preparedComponent = (
      <HelmetProvider>
        {withRouter(<NotFoundPage type='page' />)}
      </HelmetProvider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly with offer not found', () => {
    const expectedText = '404. Offer with this ID not found';
    const preparedComponent = (
      <HelmetProvider>
        {withRouter(<NotFoundPage type='offer' />)}
      </HelmetProvider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
