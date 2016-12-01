// dependencies
const React = require('react')
const Radium = require('radium')
const axios = require('axios')


// components
import Fill from './components/Fill'
import Data from './components/Data'



@Radium
export default class Humidity extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            kind: 'humidity',
            title: 'Grondvochtigheid',
            value: 0,
            loaded: 0
        }
    }

    componentDidMount()
    {
        setInterval(this.getHumidityData.bind(this), 2000)
    }

    startSpinner() { this.setState({ loaded: 0 }) }

    stopSpinner() { this.setState({ loaded: 1 }) }

    getHumidityData() {
        axios.get('http://localhost:3000/')
            .then(data => {
                let humidity = data.data

                // convert our value to a percentage
                let value = Math.floor(6000 / 23 - (10 * humidity) / 23)
                if (value > 100) value = 100
                if (value < 0) value = 0

                // save humidity data
                this.setState({
                    value: value,
                    loaded: 1
                })
            })
            .catch(err => {
                console.warn('could not fetch humidity data from server: ' + err)
            })
    }

    render()
    {
        let loadStyle = (this.state.loaded === 1) ? 'loading loaded' : 'loading'

        return (
            <div style={styles.base}>
                <div className={loadStyle}></div>

                <div style={styles.inner}>
                    <div style={[styles.info, styles.icon]}></div>
                    <div style={styles.info}>
                        <h3 style={styles.description}>{this.state.title}</h3>
                        <Data data={this.state.value + '%'}/>
                    </div>
                </div>

                <Fill kind={this.state.kind} val={this.state.value}/>
            </div>
        )
    }
}


const styles = {
    base: {
        position: 'relative',
        boxSizing: 'border-box',
        zIndex: 1,
        width: '100%',
        height: '125px',
        backgroundColor: '#43484a',
        margin: '0 auto 30px',
        padding: '20px',
        textAlign: 'center',
        overflow: 'hidden'
    },

    inner: {
        position: 'relative',
        zIndex: 3
    },

    info: {
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        verticalAlign: 'top',
        textAlign: 'right',
    },

    icon: {
        position: 'absolute',
        width: '50px',
        height: '70px',
        background: 'url(public/img/soil_humidity_2.png) center/100% no-repeat'
    },

    description: {
        margin: 0,
        padding: 0,
        fontSize: '1em',
        fontWeight: 300
    }
}