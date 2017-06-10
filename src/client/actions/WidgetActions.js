// components
import Dispatcher from '../dispatcher'

export function getWaterLevel(tankId) {
    Dispatcher.dispatch({
        type: 'FETCH_WATERLEVEL',
        tankId
    })
}

export function getStationGateState(tankId) {
    Dispatcher.dispatch({
        type: 'FETCH_WATERTANK_GATE_STATE',
        tankId
    })
}

export function setStationGateState(tankId, state) {
    Dispatcher.dispatch({
        type: 'SET_WATERTANK_GATE_STATE',
        tankId,
        state
    })
}

export function setAllGateStates(state) {
    Dispatcher.dispatch({
        type: 'SET_ALL_GATE_STATES',
        state
    })
}