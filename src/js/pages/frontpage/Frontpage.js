// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Login from './components/Login/Login'
import Grid from './components/pages/Grid'
import Menu from './components/pages/Menu'
import Notification from '../layout/Notification'

// stores
import notificationStore from '../../stores/NotificationStore'

// actions
import * as notificationActions from '../../actions/NotificationActions'


@Radium
export default class Frontpage extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            widgetActive: false,
            widgetKind: null,
            notifications: notificationStore.getAll(),
            view: 'menu'
        }
    }

    componentWillMount()
    {
        notificationStore.on('change', () => {
            this.setState({
                notifications: notificationStore.getAll()
            })
        })
    }

    toggleView = () =>
    {
        let view = (this.state.view === 'menu') ? 'grid' : 'menu'
        this.setState({ view })
    }

    render()
    {
        let menuX = null
        let gridX = null

        if (this.state.view === 'menu') {
            menuX = { transform: 'translateX(0)' }
            gridX = { transform: 'translateX(100%)' }
        } else {
            menuX = { transform: 'translateX(-100%)' }
            gridX = { transform: 'translateX(-100%)' }
        }

        const notifications = this.state.notifications.map((notification) => {
            return <Notification key={notification.id} {...notification}/>
        })

        return (
            <div id="view-wrapper" style={styles.base}>
                {notifications}

                <Login />

                <div id="menu-wrapper" style={ [styles.view, menuX] }>
                    <Menu toggleView={this.toggleView} />
                </div>

                <div id="grid-wrapper" style={ [styles.view, styles.grid, gridX] }>
                    <Grid toggleView={this.toggleView} />
                </div>
            </div>
        )
    }
}


const styles = {
    base: {
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },

    view: {
        display: 'inline-block',
        height: '100%',
        width: '100%',
        transition: 'transform 0.5s ease-in-out',
        verticalAlign: 'top'
    },
}