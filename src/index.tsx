import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import App from './components/app/app';
import {store} from './store';
import {fetchOffersAction, checkAuthAction, fetchFavoritesOffers} from './store/api-actions';
import 'react-toastify/ReactToastify.css';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction()).then((authResult) => {
  if (checkAuthAction.fulfilled.match(authResult)) {
    store.dispatch(fetchFavoritesOffers());
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position='bottom-left' />
      <App />
    </Provider>
  </React.StrictMode>
);
