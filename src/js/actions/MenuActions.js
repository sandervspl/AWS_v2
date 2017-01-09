// dependencies
const axios = require('axios')

// components
import Dispatcher from '../dispatcher'


export function getWeatherData(lat, lon) {
    Dispatcher.dispatch({ type: 'FETCH' })
    Dispatcher.dispatch({
        type: 'FETCH_WEATHER_DATA',
        lat,
        lon
    })
}

export function getPositionData() {
    Dispatcher.dispatch({ type: 'FETCH' })
    Dispatcher.dispatch({ type: 'FETCH_POSITION_DATA' })
}