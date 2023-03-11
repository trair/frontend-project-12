import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider } from 'react-i18next';
import { ApiProvider } from './context/index.js';
import {
  addNewMessage, addNewChannel, removeChannel, renameChannelName
} from './socket.js';
import store from './redux/index.js';
import i18Instance from './i18n/index.js';

import App from './App.js';

const runApp = () => {
  const lng = localStorage.getItem('language');
  if (lng) {
    i18Instance.changeLanguage(lng);
  }

  const rollbarConfig = {
    enabled: true,
    // eslint-disable-next-line no-undef
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18Instance}>
            <ApiProvider.Provider
              value={{
                addNewMessage,
                addNewChannel,
                removeChannel,
                renameChannelName,
              }}
            >
              <App />
            </ApiProvider.Provider>
          </I18nextProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>,
  );
};

export default runApp;
