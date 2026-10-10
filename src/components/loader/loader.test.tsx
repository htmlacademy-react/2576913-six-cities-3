import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correct', () => {
    const loaderTestId = 'loader';

    render(<Loader />);
    const loader = screen.getByTestId(loaderTestId);

    expect(loader).toBeInTheDocument();
  });
});
