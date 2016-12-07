// dependencies
const React = require('react')
const Radium = require('radium')

// component
import WeatherItem from './WeatherItem'


@Radium
export default class Weather extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            active: true
        }
    }

    render()
    {
        return (
            <div style={styles.base}>
                <h3 style={styles.location} className="location">Barendrecht</h3>
                <div style={styles.row}>
                    <WeatherItem kind="humidity"/>
                    <WeatherItem kind="current"/>
                    <WeatherItem kind="wind"/>
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
        fontWeight: '300'
    },

    row: {
        display: 'flex',
        flexFlow: 'row',
        marginTop: '30px',
        height: '100px',
        boxSizing: 'border-box'
    }
}