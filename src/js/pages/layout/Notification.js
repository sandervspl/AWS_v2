// dependencies
const React = require('react')
const Radium = require('radium')

// actions
import * as notificationActions from '../../actions/NotificationActions'


@Radium
export default class Notification extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            show: false
        }
    }

    componentWillMount()
    {
        setTimeout(this.toggleShow, 100)
        this.checker = setInterval(this.remove, 100)
    }

    toggleShow = () => this.setState({ show: !this.state.show })

    removeNotification = () =>
    {
        // move out of screen
        this.toggleShow()

        // shift all notifactions up
        notificationActions.shiftNotifactions()

        // remove notification from DOM after it's out of screen (.3s animation time)
        setTimeout(
            () => notificationActions.deleteNotification(this.props.id),
            300
        )
    }

    remove = () =>
    {
        const curTime = Date.now()
        const expiresTime = this.props.expires_at

        if (curTime > expiresTime) {
            clearInterval(this.checker)
            this.removeNotification()
        }
    }

    render()
    {
        let kindStyle = styles[this.props.kind]
        let iconStyle = styles[this.props.kind + 'Icon']
        let show = (this.state.show) ? styles.show : {}
        let offset = { top: this.props.offset + 'px' }

        return (
            <div id="notification-bar" style={ [styles.base, kindStyle, show, offset] }>
                <div style={ [styles.icon, iconStyle] }></div>
                <span style={styles.msg}>{this.props.text}</span>
            </div>
        )
    }
}


const styles = {
    base: {
        boxSizing: 'border-box',
        position: 'fixed',
        top: '35px',
        left: 0,
        zIndex: 100,
        width: '100%',
        height: '35px',
        transform: 'translateY(-38px)',
        cursor: 'default',
        transition: 'all .3s cubic-bezier(.825, 0, .5, 1)'
    },

    show: {
        transform: 'translateY(0)'
    },

    icon: {
        width: '35px',
        height: '100%'
    },

    msg: {
        position: 'absolute',
        top: 0,
        left: '45px',
        lineHeight: '35px',
        textShadow: '0 1px 1px rgba(0,0,0,.5)'
    },

    alert: {
        background: '#E49B51',
        boxShadow: '0 2px 0 0 rgba(228, 155, 81, .7)'
    },

    alertIcon: {
        background: '#F2AC66 url(public/img/alert_icon_white.png) center center / 70% no-repeat'
    },

    success: {
        background: '#6BB878',
        boxShadow: '0 2px 0 0 #588E64'
    },

    successIcon: {
        background: '#7AD98A url(public/img/alert_icon_white.png) center center / 70% no-repeat'
    }
}