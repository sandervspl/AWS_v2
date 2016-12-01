// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class Icon extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            weatherIconUri: 'url(public/img/weather/white/default.png)'
        }
    }

    getWeatherIconFromId(id)
    {
        switch (id)
        {
            // drizzle
            case 300:
            case 301:
            case 302:
            case 310:
                return 'url(public/img/weather/white/drizzle.png)'
            break

            // heavy drizzle / light rain
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
            case 500:
                return 'url(public/img/weather/white/rain_light.png)'
            break

            // medium rain
            case 501:
                return 'url(public/img/weather/white/rain_medium.png)'
            break

            // heavy rain
            case 502:
            case 503:
            case 504:

            // shower rain
            case 520:
            case 521:
            case 522:
            case 531:
                return 'url(public/img/weather/white/rain_heavy.png)'
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
                return 'url(public/img/weather/white/rain_snow.png)'
            break

            // (light) snow
            case 600:
            case 601:
                return 'url(public/img/weather/white/snow_light.png)'
            break

            // heavy snow
            case 602:
                return 'url(public/img/weather/white/snow_heavy.png)'
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
                return 'url(public/img/weather/white/mist.png)'
            break

            // squalls (rukwinden)
            case 771:
            case 781:
                return 'url(public/img/weather/white/windy.png)'
            break

            // clear
            case 800:
                return 'url(public/img/weather/white/sunny.png)'
            break

            // clouds
            case 801:
            case 802:
            case 803:
                return 'url(public/img/weather/white/cloudy_sunny.png)'
            break

            // heavy clouds
            case 804:
                return 'url(public/img/weather/white/cloudy.png)'
            break

            default:
                return 'url(public/img/weather/white/default.png)'
        }
    }

    render()
    {
        let uri = this.getWeatherIconFromId(this.props.weatherId)
        let weatherIconStyle = { backgroundImage: uri }

        return (
            <div style={[
                styles.base,
                weatherIconStyle
            ]}></div>
        )
    }
}


const styles = {
    base: {
        position: 'absolute',
        width: '70px',
        height: '75px',
        backgroundPosition: 'center',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat'
    }
}