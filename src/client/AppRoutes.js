// dependencies
import React from 'react';
import { Router, hashHistory } from 'react-router';
import routes from './routes';

const AppRoutes = () =>
  <Router
    history={hashHistory}
    routes={routes}
    onUpdate={() => window.scrollTo(0, 0)}
  />;

export default AppRoutes;
