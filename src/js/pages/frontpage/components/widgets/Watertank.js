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
            height: 0
        }
    }

    componentDidMount()
    {
        setInterval(this.getWaterLevel, 1000)
    }

    getWaterLevel = () =>
    {
        axios.get('http://localhost:3000/waterlevel')
            .then(data => {
                let level = data.data

                // no connection with serialport is found
                if ( ! level || level === null) {
                    // console.log('SerialPort is not connected')
                    // this.setConnected(false)
                    return
                }

                // convert our value to a percentage
                // let value = Math.floor(6000 / 23 - (10 * humidity) / 23)
                // if (value > 100) value = 100
                // if (value < 0) value = 0

                // save humidity data
                this.setState({ height: level })
            })
            .catch(err => {
                console.warn('could not fetch water level data from server: ' + err)
                // this.stopSpinner()
            })
    }

    render()
    {
        let h = this.state.height + '%'
        let height = this.state.height + '%'
        let fill = { height: height }

        return (
            <div>
                <div style={ styles.fill } height={this.state.height + '%'} id="fillPrct" />
                <div style={styles.prct}>{height}</div>
            </div>
        )
    }
}


const styles = {
    fill: {
        position: 'absolute',
        bottom: 0,
        background: '#2789BA',
        width: '100%',
    },

    prct: {
        fontSize: '14px',
        fontWeight: '200',
        color: '#000000',
        lineHeight: '50px'
    }
}