// dependencies
const React = require('react')
const Radium = require('radium')
const axios = require('axios')

// actions
import * as widgetActions from '../../../../actions/WidgetActions'

// stores
import widgetStore from '../../../../stores/WidgetStore'


@Radium
export default class Watertank extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            refreshing: false,
            height: 0
        }
    }

    componentWillMount()
    {
        widgetStore.on('water_change', () => {
            this.setState({ height: parseInt(widgetStore.getAverageHeight()) })
            this.stopRefreshSpinner()
        })
        
        widgetStore.on('fail', this.stopRefreshSpinner)

        setInterval(
            () => widgetActions.getWaterLevel(1),
            1000
        )
    }

    // stop refreshing state
    stopRefreshSpinner = () => this.setState({ refreshing: true })

    render()
    {
        let loadStyle = this.state.refreshing ? 'loading loaded' : 'loading'
        let prct = this.state.height + '%'
        let height = this.state.height + '%'
        let fill = { height: height }

        return (
            <div style={styles.base}>
                <div className={loadStyle}></div>
                <div style={ [styles.fill, fill] } id="fillPrct" />
                <div style={styles.prct}> {prct} </div>
            </div>
        )
    }
}


const styles = {
    base: {
        background: '#95D7F7',
        position: 'relative'
    },

    fill: {
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        background: '#2789BA',
        width: '100%',
        transition: 'height .3s ease'
    },

    prct: {
        position: 'relative',
        zIndex: 2,
        fontSize: '1.25em',
        fontWeight: '400',
        color: '#000000',
        lineHeight: '70px',
        textShadow: '2px 1px 6px rgba(0,0,0,0.5)'
    }
}