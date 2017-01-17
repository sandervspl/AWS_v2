// dependencies
import React, { Component } from 'react'
const Radium = require('radium')


@Radium
export default class Icon extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            iconId: ')'
        }
    }

    componentWillMount()
    {
        this.getWeatherIconFromId(this.props.weatherId)
    }

    getWeatherIconFromId(id)
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
                return 'P'

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
                return 'Q'
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
                return 'R'
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
                return 'W'
                break

            // (light) snow
            case 600:
            case 601:
                return 'V'
                break

            // heavy snow
            case 602:
                return 'X'
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
                return (this.props.clouds > 50) ? 'L' : 'M'
                break

            // squalls (rukwinden)
            case 771:
            case 781:
                return 'S'
                break

            // clear
            case 800:
                return ((new Date()).getHours() < 18) ? 'B' : 'C'   // return sun or moon
                break

            // clouds
            case 801:
            case 802:
            case 803:
                return 'N'
                break

            // heavy clouds
            case 804:
                return 'Y'
                break

            default:
                return ')'
        }
    }


    render()
    {
        let weatherId = this.props.weatherId
        let weatherIcon = this.getWeatherIconFromId(weatherId)

        return (
            <div style={styles.base}>
                <span className="meteocon" style={ [styles.icon, styles[this.props.size]] } data-icon={weatherIcon}/>
            </div>
        )
    }
}

const styles = {
    base: {
        height: '22px'
    },

    icon: {
        position: 'relative',
        fontSize: '30px',
        color: '#000'
    },

    big: {
        fontSize: '60px',
        color: '#fff',
        lineHeight: '60px'
    }
}