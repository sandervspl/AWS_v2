// dependencies
import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'


class WidgetWindowStore extends EventEmitter
{
    constructor(props)
    {
        super(props)
        // this.active = false
        this.window = {
            active: false,
            kind: null
        }
    }

    getWindow = () => this.window

    toggleWidgetWindow(kind)
    {
        this.window = {
            active: !this.window.active,
            kind
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