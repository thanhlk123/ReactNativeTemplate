import React from 'react';
import App from './src/App';
import {Provider} from 'react-redux';
import storeConfig from './src/redux/store/index';

export default function Root() {
  return (
    <Provider store={storeConfig.store}>
      <App />
    </Provider>
  );
}
