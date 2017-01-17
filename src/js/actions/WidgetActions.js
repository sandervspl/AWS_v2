// components
import Dispatcher from '../dispatcher'

export function getWaterLevel(tankId) {
    Dispatcher.dispatch({
        type: 'FETCH_WATERLEVEL',
        tankId
    })
}

export function getGateState(tankId) {
    Dispatcher.dispatch({
        type: 'FETCH_WATERTANK_GATE',
        tankId
    })
}

export function setAllGateStates(state) {
    Dispatcher.dispatch({
        type: 'SET_ALL_GATE_STATES',
        state
    })
}