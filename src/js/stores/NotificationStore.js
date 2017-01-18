// dependencies
import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'


class NotificationStore extends EventEmitter
{
    constructor()
    {
        super()
        this.counter = 0
        this.start = 45
        this.height = 35
        this.notifications = []
        this.timeMounted = Date.now()
    }

    getAll = () => this.notifications

    createNotification = (kind, text, expiresTime) =>
    {
        let offset = this.start + (this.notifications.length * this.height)
        this.notifications.push({
            id: this.counter,
            kind,
            text,
            offset,
            created_at: Date.now(),
            expires_at: expiresTime
        })

        this.counter += 1
        this.emit('change')
    }

    deleteNotification = (id) =>
    {
        for (let [i, notification] of this.notifications.entries()) {
            if (notification.id === id) {
                this.notifications.splice(i, 1)
                break
            }
        }

        this.emit('change')
        this.emit('delete_notification')
    }

    shiftNotifications = () =>
    {
        for (let [i, notification] of this.notifications.entries()) {
            notification.offset -= this.height
        }

        this.emit('change')
    }

    handleActions = (action) =>
    {
        if (Date.now() - this.timeMounted < 750)
            return

        switch(action.type)
        {
            case 'CREATE_NOTIFICATION': {
                this.createNotification(action.kind, action.text, action.expiresTime)
                break
            }

            case 'DELETE_NOTIFICATION': {
                this.deleteNotification(action.id)
                break
            }

            case 'SHIFT_NOTIFICATIONS': {
                this.shiftNotifications()
                break
            }
        }
    }
}

const notificationStore = new NotificationStore

// dispatcher
Dispatcher.register(notificationStore.handleActions)

export default notificationStore