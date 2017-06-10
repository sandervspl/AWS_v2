// dependencies
const React = require('react')

// components
import { Route, IndexRoute } from 'react-router'
import Layout from './pages/layout/Layout'
import Frontpage from './pages/frontpage/Frontpage'
import Error404 from './pages/error/404'

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={Frontpage} />
        <Route path="*" component={Error404} />
    </Route>
)

export default routes