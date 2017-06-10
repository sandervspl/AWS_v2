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

export function setBigButtonState(state) {
    Dispatcher.dispatch({
        type: 'SET_BIGBUTTON_STATE',
        state
    })
}

export function fetchBigButtonState() {
    Dispatcher.dispatch({ type: 'FETCH_BIGBUTTON_STATE' })
}