import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import { Provider as RollbarProvider } from '@rollbar/react';
import Rollbar from 'rollbar';

import App from './App';
import store from './redux/index.js';
import './styles/style.css';

// i18next
import { I18nextProvider } from 'react-i18next';
import i18Instance from './i18n/index.js';

//rollbar
const rollbarConfig = {
  enabled: 'production',
  accessToken: '113424b128674b0ab5c9f4d2b7c09934',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const rollbar = new Rollbar(rollbarConfig);

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <Provider store={store}>
    <RollbarProvider instance={rollbar}>
      <I18nextProvider i18n={i18Instance}>
        <App />
      </I18nextProvider>
    </RollbarProvider>
  </Provider>
);
