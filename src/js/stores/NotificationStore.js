// dependencies
import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'


class NotificationStore extends EventEmitter
{
    constructor()
    {
        super()
        this.counter = 0
        this.notifications = [
            {
                kind: 'TYPE_WARNING',
                text: 'Watertank wordt geleegd!',
                created_at: Date.now(),
                expires_at: Date.now() + 10 * 1000
            }
        ]
    }

    getAll = () => this.notifications

    createNotification = (kind, text, expiresTime) =>
    {
        this.notifications.push({
            id: this.counter,
            kind,
            text,
            created_at: Date.now(),
            expires_at: expiresTime
        })

        this.counter += 1
        this.emit('change')
    }

    handleActions = (action) =>
    {
        console.log(`NotificationStore action received: ${action.type}`)
        console.log(action)

        switch(action.type)
        {
            case 'CREATE_NOTIFICATION': {
                console.log('Creating notification...')
                this.createNotification(action.kind, action.text, action.expiresTime)
                break
            }

            case 'DELETE_NOTIFICATION': {
                break
            }
        }
    }
}

const notificationStore = new NotificationStore

// dispatcher
Dispatcher.register(notificationStore.handleActions)

// DEBUG: FOR CONSOLE
window.notificationStore = notificationStore
window.dispatcher = Dispatcher

export default notificationStore