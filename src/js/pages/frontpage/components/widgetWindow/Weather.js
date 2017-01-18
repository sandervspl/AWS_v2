// dependencies
const React = require('react')
const Radium = require('radium')
const axios = require('axios')

// component
import WeatherItem from './WeatherItem'



@Radium
export default class Weather extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        let { weatherData } = this.props
        let loadStyle = (this.props.refreshing === false) ? 'loading loaded' : 'loading'

        return (
            <div style={styles.base}>
                <div className={loadStyle}></div>

                <h3 style={styles.location} className="location"> {weatherData.posName} </h3>

                <div style={styles.row}>
                    <WeatherItem kind="humidity" data={weatherData.humidity} />
                    <WeatherItem kind="temperature" data={weatherData} />
                    <WeatherItem kind="wind" data={weatherData.wind} />
                </div>
            </div>
        )
    }
}


const styles = {
    base: {
        width: '100%',
        height: '100%',
        padding: '10px 0',
        boxSizing: 'border-box'
    },

    location: {
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: '400'
    },

    row: {
        display: 'flex',
        flexFlow: 'row',
        marginTop: '20px',
        height: '100px',
        boxSizing: 'border-box'
    }
}