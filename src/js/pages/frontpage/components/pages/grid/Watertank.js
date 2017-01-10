// dependencies
const React = require('react')
const Radium = require('radium')
const axios = require('axios')

// actions
import * as notificationActions from '../../../../../actions/NotificationActions'
import * as widgetActions from '../../../../../actions/WidgetActions'

// stores
import widgetStore from '../../../../../stores/WidgetStore'


@Radium
export default class Watertank extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            id: -1,
            active: false,
            capacity: 30,
            fillPrct: 0,
        }
    }

    componentWillMount()
    {
        this.setId(this.props.tankId)

        widgetStore.on('water_change', () => {
            this.setState({ fillPrct: widgetStore.getWaterHeight(this.state.id)
            })
        })

        setInterval(
            () => widgetActions.getWaterLevel(this.state.id),
            1000
        )

        setTimeout(
            () => { this.setState({ fillPrct: widgetStore.getWaterHeight(this.state.id) })
            },
            1000
        )
    }

    setId = (id) => this.setState({ id })

    toggleActive = () =>
    {
        this.state.active = !this.state.active
        this.notification()
    }

    notification = () =>
    {
        const expiresTime = Date.now() + 3000

        if (this.state.active) {
            const msg = `(Watertank ${this.state.id}) wordt geleegd.`
            notificationActions.createNotification('success', msg, expiresTime)
        } else {
            const msg = `(Watertank ${this.state.id}) is gestopt met legen.`
            notificationActions.createNotification('alert', msg, expiresTime)
        }
    }

    render()
    {
        let fillPrct  = this.state.fillPrct
        let capacity  = this.state.capacity
        let current   = 0
        let fillWidth = 0

        let warningStyle = null
        let warningMsg = ''

        if (Number.isFinite(fillPrct)) {
            current = Math.ceil((fillPrct / 100) * capacity)
            fillWidth = { width: `${fillPrct}%` }

            if (fillPrct >= 80) {
                warningStyle = styles.warning
                warningMsg = 'Bijna vol!'
            }

            if (fillPrct >= 95) {
                warningMsg = 'Tank zit vol!'
            }
        }

        let activeStyle = (this.state.active) ? styles.on : ''
        let title = 'Tank ' + this.state.id

        return (
            <div style={ [styles.base, this.props.marginStyle, activeStyle] } onClick={this.toggleActive}>
                <div style={styles.title}> {title} </div>

                <div style={warningStyle}> {warningMsg} </div>

                <div style={styles.data}>
                    <div style={styles.prct}> {fillPrct}% </div>
                    <div style={styles.curCap}> {current}L / {capacity}L </div>
                </div>

                <div style={styles.fillBg}>
                    <div style={ [styles.fill, fillWidth] }></div>
                </div>
            </div>
        )
    }
}


const styles = {
    base: {
        position: 'relative',
        display: 'inline-block',
        marginBottom: '60px',
        width: '80px',
        height: '90px',
        verticalAlign: 'top',
        background: '#E49B51',
        textAlign: 'center',
        boxShadow: '0 2px 1px 0 rgba(0,0,0,0.5)',
        cursor: 'pointer',
    },

    on: {
        background: '#7AD98A',
    },

    title: {
        position: 'absolute',
        top: '-21px',
        left: 0,
        right: 0,
        fontSize: '12px'
    },

    warning: {
        position: 'absolute',
        width: '100%',
        height: '15px',
        background: '#DA4747',
        textAlign: 'center',
        fontSize: '9px',
        lineHeight: '15px'
    },

    data: {
        position: 'relative',
        top: 'calc(50% - 27.5px)'
    },

    prct: {
        fontSize: '1.5em',
        fontWeight: '500'
    },

    curCap: {
        fontSize: '.7em',
        fontWeight: '300'
    },

    fillBg: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '10px',
        background: '#eee',
    },

    fill: {
        position: 'absolute',
        top: 0,
        left: 0,
        background: '#2689BA',
        height: '100%',
        maxWidth: '100%',
        minWidth: '1%',
        transition: 'width .3s ease'
    }
}