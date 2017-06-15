// dependencies
const React = require('react');

// components
import { Route, IndexRoute } from 'react-router';
import Layout from './pages/layout/Layout';
import Frontpage from './pages/frontpage/Frontpage';
import Help from './pages/help/Help';
import HelpMenu from './pages/help/HelpMenu/HelpMenu';
import Start from './pages/help/Start/Start';
import Startscherm from './pages/help/Startscherm/Startscherm';
import Wateropslag from './pages/help/Wateropslag/Wateropslag';
import Error404 from './pages/error/404';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Frontpage} />
    <Route exact path="/help" component={Help}>
      <IndexRoute component={HelpMenu} />
      <Route path="/help/start" component={Start} />
      <Route path="/help/startscherm" component={Startscherm} />
      <Route path="/help/wateropslag" component={Wateropslag} />
    </Route>
    <Route path="*" component={Error404} />
  </Route>
);

export default routes;
