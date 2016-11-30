// dependencies
const React = require('react')
const ReactDOM = require('react-dom')

// components
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Frontpage from './pages/frontpage/Frontpage'
import Watertank from './pages/watertank/Watertank'
import Error404 from './pages/error/404'

const routes = (
    <Route path="/">
        <IndexRoute component={Frontpage} />
        <Route path="/water" component={Watertank} />
        <Route path="*" component={Error404} />
    </Route>
)

export default routes