// dependencies
const React = require('react')
const Radium = require('radium')
const axios = require('axios')

// components
import BigButton from '../BigButton'
import Logo from '../Logo'
import WidgetMenu from '../WidgetMenu'
import WidgetWindow from '../WidgetWindow'

// global variables
const g_api_key = 'a16ebee24012358ee9007cc5e4f2ed93&id=2747890'



@Radium
export default class Menu extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            widgetActive: false,
            widgetKind: null,
            pos: {},                // lat and longitude
            weatherData: {
                refreshing: 1,      // determines if we are refreshing the weather data (for spinners)
                posName: '',        // name of current position
                humidity: 0,        // humidity percentage
                temperature: {
                    temp: 0,        // temperature (celcius)
                    id: 0           // weather ID of OpenWeather API
                },
                wind: {
                    speed: 0,       // wind speed in km/h
                    angle: 0        // wind angle in degrees
                }
            }
        }
    }

    componentDidMount()
    {
        this.getWeatherData()
        setInterval(() => { this.getWeatherDataFromPosition(this.state.pos) }, 60000)
    }

    activateWidgetWindow = (active, kind) =>
    {
        this.setState({
            widgetActive: active,
            widgetKind: kind
        })
    }

    // start refreshing state
    startRefreshSpinner()
    {
        let { weatherData } = this.state
        this.setState({
            weatherData: {
                refreshing: 1,
                posName: weatherData.posName,
                humidity: weatherData.humidity,
                temperature: {
                    temp: weatherData.temperature.temp,
                    id: weatherData.temperature.id
                },
                wind: {
                    speed: weatherData.wind.speed,
                    angle: weatherData.wind.angle
                }
            }
        })
    }

    // stop refreshing state
    stopRefreshSpinner()
    {
        let { weatherData } = this.state
        this.setState({
            weatherData: {
                refreshing: 0,
                posName: weatherData.posName,
                humidity: weatherData.humidity,
                temperature: {
                    temp: weatherData.temperature.temp,
                    id: weatherData.temperature.id
                },
                wind: {
                    speed: weatherData.wind.speed,
                    angle: weatherData.wind.angle
                }
            }
        })
    }

    // save position data once
    savePositionData(pos) { this.setState({ pos }) }

    // save the fetched weather data to our state
    saveWeatherData(response)
    {
        let data = response.data

        this.setState({
            weatherData: {
                refreshing: 0,
                posName: data.name,
                humidity: data.main.humidity,
                temperature: {
                    temp: data.main.temp,
                    id: data.weather[0].id
                },
                wind: {
                    speed: data.wind.speed,
                    angle: data.wind.deg
                }
            }
        })
    }


    // fetch weather data from OpenWeather API
    // with Langitude and Longitude
    getWeatherDataFromPosition(pos)
    {
        this.startRefreshSpinner()

        const crd = pos.coords

        // create endpoint for OpenWeather API
        let endpoint = 'http://api.openweathermap.org/data/2.5/weather'
        endpoint += '?lat=' + crd.latitude
        endpoint += '&lon=' + crd.longitude
        endpoint += '&units=metric'
        endpoint += '&APPID=' + g_api_key

        // console.log('Fetching weather data...')

        // grab weather data with the long and lat values
        axios.get(endpoint)
            .then((response) => {
                // console.log('Sucesfully fetched weather data.')
                this.saveWeatherData(response)
                this.stopRefreshSpinner()
            })
            .catch((error) => {
                console.warn(error)
            })
    }


    // start weather data fetch process
    getWeatherData()
    {
        this.startRefreshSpinner()

        // set options for position fetch
        const options = {
            enableHighAccuracy: true,
            // timeout: 5000,
            maximumAge: 0
        }

        // console.log('Fetching position data...')

        // fetch current position data
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                this.savePositionData(pos)
                this.getWeatherDataFromPosition(pos)
            },
            (err) => {
                console.warn('ERROR(' + err.code + '): ' + err.message)
            },
            options
        )
    }

    render()
    {
        return (
            <div style={styles.base}>
                <Logo />
                <WidgetMenu
                    activateWidgetWindow={this.activateWidgetWindow}
                    toggleView={this.props.toggleView}
                    weatherData={this.state.weatherData}
                />
                <BigButton
                    showNotification={this.props.showNotification}
                    hideNotification={this.props.hideNotification}
                />
                <WidgetWindow
                    active={this.state.widgetActive}
                    kind={this.state.widgetKind}
                    weatherData={this.state.weatherData}
                />
            </div>
        )
    }
}


const styles = {
    base: {
        padding: '20px 0 0',
        height: '100%',
        width: '100%',
    }
}