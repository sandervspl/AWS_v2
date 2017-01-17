// components
import Dispatcher from '../dispatcher'

export function getWaterLevel(tankId) {
    Dispatcher.dispatch({
        type: 'FETCH_WATERLEVEL',
        tankId
    })
}

// export function getGateState(tankId) {
//     Dispatcher.dispatch({
//         type: 'FETCH_WATERTANK_GATE',
//         tankId
//     })
// }

export function setGateStateButton(tankId, state) {
    Dispatcher.dispatch({
        type: 'SET_GATE_STATE_BUTTON',
        tankId,
        state
    })
}

export function setAllGateStates(tankId, state) {
    Dispatcher.dispatch({
        type: 'SET_ALL_GATE_STATES',
        tankId,
        state
    })
}