import { render, screen } from '@testing-library/react';
import { withRouter } from '../../utils/mock-component';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedAltText = '6 cities logo';
    const preparedComponent = withRouter(<Logo />);

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
