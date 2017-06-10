// dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// components
import AppRoutes from './AppRoutes';

// store
import store from './store';

window.onload = () => {
  ReactDOM.render(
      <Provider store={store} key="provider">
        <AppRoutes />
      </Provider>,
      document.getElementById('app'),
  );
};