// components
import Dispatcher from '../dispatcher'

export function navFromTo(curView, nextView) {
    Dispatcher.dispatch({
        type: 'NAV_FROM_TO',
        curView,
        nextView
    })
}