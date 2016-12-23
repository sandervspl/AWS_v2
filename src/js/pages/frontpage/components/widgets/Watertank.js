// dependencies
const React = require('react')
const Radium = require('radium')
const axios = require('axios')

@Radium
export default class Watertank extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            refreshing: 1,
            height: 0
        }
    }

    componentDidMount()
    {
        setInterval(this.getWaterLevel, 1000)
    }

    // start refreshing state
    startRefreshSpinner()
    {
        this.setState({ refreshing: 1 })
    }

    // stop refreshing state
    stopRefreshSpinner()
    {
        this.setState({ refreshing: 0 })
    }

    getWaterLevel = () =>
    {
        axios.get('http://localhost:3000/waterlevel')
            .then(data => {
                this.stopRefreshSpinner()

                let level = data.data

                // no connection with serialport is found
                if ( ! level || level === null)
                    return

                // convert our value to a percentage
                let val = Math.ceil(100 - 10 * level)
                if (val > 100) val = 100
                if (val < 0) val = 0

                // save humidity data
                this.setState({ height: val })
            })
            .catch(err => {
                console.warn('could not fetch water level data from server: ' + err)
                this.stopRefreshSpinner()
            })
    }

    render()
    {
        let loadStyle = (this.state.refreshing === 0) ? 'loading loaded' : 'loading'
        let prct = this.state.height + '%'
        let height = this.state.height + '%'
        let fill = { height: height }

        return (
            <div>
                <div className={loadStyle}></div>
                <div style={ [styles.fill, fill] } id="fillPrct" />
                <div style={styles.prct}> {prct} </div>
            </div>
        )
    }
}


const styles = {
    fill: {
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        background: '#2789BA',
        width: '100%',
    },

    prct: {
        position: 'relative',
        zIndex: 2,
        fontSize: '1.25em',
        fontWeight: '400',
        color: '#000000',
        lineHeight: '70px'
    }
}