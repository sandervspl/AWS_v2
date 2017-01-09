// components
import Dispatcher from '../dispatcher'

export function navAwayFromMenu(view) {
    Dispatcher.dispatch({
        type: 'NAV_AWAY_FROM_MENU',
        view
    })
}

export function navBackTo(view) {
    Dispatcher.dispatch({
        type: 'NAV_TO_VIEW',
        view
    })
}