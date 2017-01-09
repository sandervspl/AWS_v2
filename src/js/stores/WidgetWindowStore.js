// dependencies
import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'


class WidgetWindowStore extends EventEmitter
{
    constructor(props)
    {
        super(props)
        this.window = {
            active: false,
            kind: null
        }
    }

    getWindow = () => this.window

    toggleWidgetWindow = (kind) =>
    {
        let newActive = !this.window.active,
            newKind   = kind

        if (this.window.active && this.window.kind === kind) {
            newActive = false
            newKind = this.window.kind
        }
        else if (this.window.active && this.window.kind !== kind) {
            newActive = true
            newKind = kind
        }

        this.window = {
            active: newActive,
            kind: newKind
        }

        this.emit('toggle_widget_window')
    }
    
    handleActions = (action) =>
    {
        switch(action.type)
        {
            case 'TOGGLE_WIDGET_WINDOW': {
                this.toggleWidgetWindow(action.kind)
                break
            }
        }
    }
}

const widgetWindow = new WidgetWindowStore

// dispatcher
Dispatcher.register(widgetWindow.handleActions)

export default widgetWindow