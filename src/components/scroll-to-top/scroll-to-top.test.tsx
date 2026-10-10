import { render, screen } from '@testing-library/react';
import ScrollToTop from './scroll-to-top';

describe('Component: ScrollToTop', () => {
  it('should render correctly', () => {
    const componentTestId = 'scrollToTop';
    const scrollToMock = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);

    render(<ScrollToTop />);

    expect(screen.getByTestId(componentTestId)).toBeInTheDocument();
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    scrollToMock.mockRestore();
  });

  it('should not scroll to top again when the component rerenders', () => {
    const scrollToMock = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    const {rerender} = render(<ScrollToTop />);

    rerender(<ScrollToTop />);

    expect(scrollToMock).toHaveBeenCalledTimes(1);
    scrollToMock.mockRestore();
  });
});
