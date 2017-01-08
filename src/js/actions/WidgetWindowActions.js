// components / vars
import Dispatcher from '../dispatcher'

export function toggleWidgetWindow(kind) {
    Dispatcher.dispatch({
        type: 'TOGGLE_WIDGET_WINDOW',
        kind,
    })
}