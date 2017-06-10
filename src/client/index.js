// dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// components
import AppRoutes from './AppRoutes'
const reactApp = document.getElementById('app')

window.onload = () => {
    ReactDOM.render(<AppRoutes/>, reactApp)
};