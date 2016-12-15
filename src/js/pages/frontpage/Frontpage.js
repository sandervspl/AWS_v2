// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Menu from './components/pages/Menu'
import Grid from './components/pages/Grid'
import Notification from '../layout/Notification'


@Radium
export default class Frontpage extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            widgetActive: false,
            widgetKind: null,

            notification: null,
            notificationKind: null,
            notificationMsg: null,
            notificationShow: null,

            view: 'menu'
        }

        this.timeout = null
    }

    toggleView = () =>
    {
        let view = (this.state.view === 'menu') ? 'grid' : 'menu'
        this.setState({ view })
    }

    showNotification = (kind, msg, time = 5000) =>
    {
        clearTimeout(this.timeout)
        
        this.setState({
            notificationKind: kind,
            notificationMsg: msg,
            notificationShow: 'show'
        })

        if (time > 0) this.timeout = setTimeout(this.hideNotification, time)
    }

    hideNotification = () =>
    {
        this.setState({ notificationShow: null })
    }

    render()
    {
        // let curView = (this.state.view === 'menu') ? '' : styles.gridView

        let menuX = null
        let gridX = null

        if (this.state.view === 'menu') {
            menuX = { transform: 'translateX(0)' }
            gridX = { transform: 'translateX(100%)' }
        } else {
            menuX = { transform: 'translateX(-100%)' }
            gridX = { transform: 'translateX(-100%)' }
        }

        let notiKind = this.state.notificationKind
        let notiMsg = this.state.notificationMsg
        let notiShow = this.state.notificationShow

        return (
            <div id="view-wrapper" style={styles.base}>
                <Notification
                    kind={notiKind}
                    msg={notiMsg}
                    show={notiShow}
                />

                <div id="menu-wrapper" style={ [styles.view, menuX] }>
                    <Menu
                        toggleView={this.toggleView}
                        showNotification={this.showNotification}
                        hideNotification={this.hideNotification}
                    />
                </div>

                <div id="grid-wrapper" style={ [styles.view, styles.grid, gridX] }>
                    <Grid
                        toggleView={this.toggleView}
                        showNotification={this.showNotification}
                    />
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