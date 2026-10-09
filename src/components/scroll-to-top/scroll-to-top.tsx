function ScrollToTop(): JSX.Element {
  window.scrollTo(0, 0);

  return <span data-testid="scrollToTop"></span>;
}

export default ScrollToTop;
