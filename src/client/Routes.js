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
import Overzicht from './pages/help/Overzicht/Overzicht';
import Weer from './pages/help/Weer/Weer';
import Drainage from './pages/help/Drainage/Drainage';
import FAQ from './pages/help/FAQ/FAQ';
import Error404 from './pages/error/404';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Frontpage} />
    <Route exact path="/help" component={Help}>
      <IndexRoute component={HelpMenu} />
      <Route path="/help/start" component={Start} />
      <Route path="/help/startscherm" component={Startscherm} />
      <Route path="/help/wateropslag" component={Wateropslag} />
      <Route path="/help/overzicht" component={Overzicht} />
      <Route path="/help/weer" component={Weer} />
      <Route path="/help/drainage" component={Drainage} />
      <Route path="/help/faq" component={FAQ} />
    </Route>
    <Route path="*" component={Error404} />
  </Route>
);

export default routes;
