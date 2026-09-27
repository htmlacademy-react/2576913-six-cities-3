enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const URL_MARKER_DEFAULT = '/img/pin.svg';
const URL_MARKER_ACTIVE = '/img/pin-active.svg';

export {AppRoute, AuthorizationStatus, URL_MARKER_ACTIVE, URL_MARKER_DEFAULT};
