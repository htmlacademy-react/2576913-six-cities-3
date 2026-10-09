function Footer(): JSX.Element {
  return (
    <footer className="footer container" data-testid="footerContainer">
      <a className="footer__logo-link" href="main.html">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" data-testid="footerLogo" />
      </a>
    </footer>
  );
}

export default Footer;
