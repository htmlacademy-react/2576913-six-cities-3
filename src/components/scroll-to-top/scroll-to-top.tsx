import {useEffect} from 'react';

function ScrollToTop(): JSX.Element {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <span data-testid="scrollToTop"></span>;
}

export default ScrollToTop;
