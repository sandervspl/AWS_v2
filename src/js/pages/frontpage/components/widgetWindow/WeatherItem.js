// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Icon from '../widgets/Weather/Icon'


@Radium
export default class WeatherItem extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    getWeatherTextFromId(id)
    {
        switch (id)
        {
            // thunderstorms
            case 200:
            case 201:
            case 202:
            case 210:
            case 211:
            case 212:
            case 221:
            case 230:
            case 231:
            case 232:
                return 'Onweer'

            // drizzle
            case 300:
            case 301:
            case 302:
            case 310:

            // heavy drizzle / light rain
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
            case 500:
                return 'Miezer'
                break

            // medium rain
            case 501:

            // heavy rain
            case 502:
            case 503:
            case 504:

            // shower rain
            case 520:
            case 521:
            case 522:
            case 531:
                return 'Regen'
                break

            // freezing/snow rain
            case 511:

            // sleet (ijzel)
            case 611:
            case 612:
            case 615:
            case 616:
            case 620:
            case 621:
            case 622:
                return 'IJzel'
                break

            // (light) snow
            case 600:
            case 601:
                return 'Sneeuw'
                break

            // heavy snow
            case 602:
                return 'Hevige Sneeuw'
                break

            // atmospheric
            case 701:
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
            case 761:
            case 762:
                return (this.props.clouds > 50) ? 'Mist' : 'Dikke Mist'
                break

            // squalls (rukwinden)
            case 771:
            case 781:
                return 'S'
                break

            // clear
            case 800:
                return 'Helder'
                break

            // clouds
            case 801:
            case 802:
            case 803:
                return 'Bewolkt'
                break

            // heavy clouds
            case 804:
                return 'Zwaar Bewolkt'
                break

            default:
                return 'Niet beschikbaar'
        }
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
                <h3 style={styles.title}> {this.getWeatherTextFromId(this.props.data.id)} </h3>
                <Icon weatherId={this.props.data.id} size="big"/>
                <p style={ [styles.data, styles.temp] }> {(this.props.data.temp).toFixed(0)}º </p>
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
        fontSize: '14px',
        fontWeight: '100',
        transform: 'translateY(-5px)'
    },

    icon: {
        padding: '10px 0 0',
        height: '40px',
    },
    
    data: {
        padding: '5px 0 0',
        fontSize: '20px'
    },

    temp: {
        padding: '37px 0 0'
    }
}