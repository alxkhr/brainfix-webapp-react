import './serviceWorker/webapp.sw';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import configureStore from './state/configureStore';

if ('serviceWorker' in navigator && navigator.onLine) {
  navigator.serviceWorker.register('webapp.sw.js', { scope: './' });
}

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
