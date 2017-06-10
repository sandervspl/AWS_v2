// dependencies
import Dispatcher from '../dispatcher'


export function createNotification(kind, text, expiresTime) {
    Dispatcher.dispatch({
        type: 'CREATE_NOTIFICATION',
        kind,
        text,
        expiresTime
    })
}

export function deleteNotification(id) {
    Dispatcher.dispatch({
        type: 'DELETE_NOTIFICATION',
        id
    })
}

export function shiftNotifactions() {
    Dispatcher.dispatch({ type: 'SHIFT_NOTIFICATIONS' })
}