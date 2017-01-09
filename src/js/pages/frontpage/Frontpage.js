// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Login from './components/Login/Login'
import Grid from './components/pages/Grid'
import Menu from './components/pages/Menu'
import Notification from '../layout/Notification'
import Navbar from './components/Navbar'

// stores
import notificationStore from '../../stores/NotificationStore'
import navbarStore from '../../stores/NavbarStore'


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

        navbarStore.on('view_change', () => {
            this.setState({ view: navbarStore.getView() })
        })
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
                <Navbar title={this.state.view}/>

                {notifications}

                {/*<Login/>*/}

                <div id="menu-wrapper" style={ [styles.view, menuX] }>
                    <Menu />
                </div>

                <div id="grid-wrapper" style={ [styles.view, styles.grid, gridX] }>
                    <Grid />
                </div>
            </div>
        )
    }
}


const styles = {
    base: {
        height: '100%',
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