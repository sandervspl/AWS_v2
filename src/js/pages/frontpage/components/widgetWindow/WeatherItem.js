// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class WeatherItem extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    initItem()
    {
        switch(this.props.kind)
        {
            case 'humidity':
                return this.humidityItem()
            break

            case 'temperature':
                return this.temperatureItem()
            break

            case 'wind':
                return this.windItem()
            break

            default:
                return <div></div>
        }
    }

    humidityItem()
    {
        return (
            <div>
                <h3 style={styles.title}>Luchtvochtigheid</h3>
                <img src="public/img/rain_medium.png" alt="Humidity" style={styles.icon}/>
                <p style={styles.data}> {this.props.data}% </p>
            </div>
        )
    }

    temperatureItem()
    {
        return (
            <div>
                <h3 style={styles.title}>Bewolkt</h3>
                <img src="public/img/cloudy_white.png" alt="Weather" style={styles.icon}/>
                <p style={styles.data}> {(this.props.data.temp).toFixed(0)}º </p>
            </div>
        )
    }

    windItem()
    {
        let direction = { transform: `rotateZ(${this.props.data.angle}deg)` }

        return (
            <div>
                <h3 style={styles.title}>Windsnelheid</h3>
                <img src="public/img/arrow_icon.png" alt="Wind" style={ [styles.icon, direction] }/>
                <p style={styles.data}>{this.props.data.speed} km/u</p>
            </div>
        )
    }

    render()
    {
        let style = (this.props.kind !== 'wind') ? { borderRight: '1px solid #8D8D8D' } : {}
        let data = this.initItem()

        return (
            <div style={ [styles.base, style] }>
                {data}
            </div>
        )
    }
}


const styles = {
    base: {
        flex: '1 1 auto',
        textAlign: 'center',
    },

    title: {
        fontSize: '11px',
        fontWeight: '100',
        transform: 'translateY(-5px)'
    },

    icon: {
        padding: '10px 0 0',
        height: '40px',
    },
    
    data: {
        padding: '5px 0 0',
        fontSize: '24px'
    }
}