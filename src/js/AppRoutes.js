const React = require('react')
import { Router, hashHistory } from 'react-router'
import routes from './routes'

export default class AppRoutes extends React.Component {
    render() {
        return (
            <Router
                history={hashHistory}
                routes={routes}
                onUpdate={() => window.scrollTo(0, 0)}
            />
        )
    }
}