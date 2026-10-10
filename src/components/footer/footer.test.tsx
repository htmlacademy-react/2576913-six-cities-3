import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const footerContainerTestId = 'footerContainer';
    const footerLogoTestId = 'footerLogo';

    render(withRouter(<Footer />));
    const footerContainer = screen.getByTestId(footerContainerTestId);
    const footerLogo = screen.getByTestId(footerLogoTestId);

    expect(footerContainer).toBeInTheDocument();
    expect(footerLogo).toBeInTheDocument();
  });
});
