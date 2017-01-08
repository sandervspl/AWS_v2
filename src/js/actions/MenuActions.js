// dependencies
const axios = require('axios')

// components / vars
import Dispatcher from '../dispatcher'
import * as vars from '../secret/vars'


export function getWeatherData(lat, lon) {
    // tell store we are fetching (start load spinner)
    Dispatcher.dispatch({ type: 'FETCH_WEATHER_DATA' })

    // create endpoint for OpenWeather API
    let endpoint = 'http://api.openweathermap.org/data/2.5/weather'
    endpoint += '?lat=' + lat
    endpoint += '&lon=' + lon
    endpoint += '&units=metric'
    endpoint += '&APPID=' + vars.WeatherApiKey

    // fetch weather data from openweather api with the long and lat values
    axios.get(endpoint)
        .then((data) => {
            // send fetched data to dispatcher
            Dispatcher.dispatch({
                type: 'GET_SUCCESS_WEATHER_DATA',
                data: data.data
            })
        })
        .catch((error) => {
            console.warn(error)
            Dispatcher.dispatch({ type: 'GET_FAIL_WEATHER_DATA' })
        })
}

export function getPositionData() {
    Dispatcher.dispatch({ type: 'FETCH_WEATHER_DATA' })
    Dispatcher.dispatch({ type: 'FETCH_POSITION_DATA' })
}

export function toggleWidgetWindow(state, kind) {
    Dispatcher.dispatch({
        type: 'TOGGLE_WIDGET_WINDOW',
        kind,
        state
    })
}