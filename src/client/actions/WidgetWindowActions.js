// components
import Dispatcher from '../dispatcher'

export function toggleWidgetWindow(kind) {
    Dispatcher.dispatch({
        type: 'TOGGLE_WIDGET_WINDOW',
        kind,
    })
}

export function closeWidgetWindow() {
    Dispatcher.dispatch({ type: 'CLOSE_WIDGET_WINDOW' })
}