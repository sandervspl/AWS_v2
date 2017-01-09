// dependencies
const React = require('react')
const ReactDOM = require('react-dom')

// components
import AppRoutes from './AppRoutes'
const reactApp = document.getElementById('app')

window.onload = () => {
    ReactDOM.render(<AppRoutes/>, reactApp)
};