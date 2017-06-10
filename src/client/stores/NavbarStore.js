// dependencies
import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'


class NavbarStore extends EventEmitter
{
    constructor(props)
    {
        super(props)
        this.view = 'menu'

        this.backBtn = {
            active: false,
            title: ''
        }
    }
    
    getView = () => this.view
    getBackBtn = () => this.backBtn

    navTo = (curView, nextView) =>
    {
        if (nextView === 'menu') {
            this.backBtn.active = false
            this.backBtn.title = ''
        } else {
            this.backBtn.active = true
            this.backBtn.title = curView
        }

        this.view = nextView
        this.emit('view_change')
    }

    handleActions = (action) =>
    {
        switch(action.type)
        {
            case 'NAV_FROM_TO': {
                this.navTo(action.curView, action.nextView)
                break
            }

            case 'NAV_TO_VIEW': {
                this.navTo(action.view)
            }
        }
    }
}

const navbarStore = new NavbarStore

// dispatcher
Dispatcher.register(navbarStore.handleActions)

export default navbarStore