// dependencies
import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'


class NavbarStore extends EventEmitter
{
    constructor(props)
    {
        super(props)
        this.view = 'menu'
        this.backBtnActive = false
    }
    
    getView = () => this.view
    isBackBtnActive = () => this.backBtnActive

    navAwayFromMenu = () =>
    {
        this.backBtnActive = true
        this.emit('activate_back_btn')
    }

    navTo = (view) =>
    {
        if (view === 'menu') {
            this.backBtnActive = false
        } else {
            this.navAwayFromMenu()
        }

        this.view = view
        this.emit('view_change')
    }

    handleActions = (action) =>
    {
        switch(action.type)
        {
            case 'NAV_AWAY_FROM_MENU': {
                this.navAwayFromMenu()
                this.navTo(action.view)
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