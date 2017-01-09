// components
import Dispatcher from '../dispatcher'

export function getWaterLevel(tankId) {
    Dispatcher.dispatch({
        type: 'FETCH_WATERLEVEL',
        tankId
    })
}