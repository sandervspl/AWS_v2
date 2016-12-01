// dependencies
const React = require('react')
const Radium = require('radium')
const axios = require('axios')

// components
import Data from './components/Data'
import Subdata from './weather/Subdata'
import Icon from './weather/Icon'
import InfoDropdown from './weather/InfoDropdown'

// misc
const g_api_key = 'a16ebee24012358ee9007cc5e4f2ed93&id=2747890'


@Radium
export default class Weather extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            kind: 'weather',
            title: 'Weersverwachting',
            loaded: -1,
            baseHeight: '125px',

            pos: {},
            posName: '',

            weather: {
                id: 0,
                main: '',
                description: 'n/a',
                pressure: 0,
                humidity: 0,
                clouds: 0,
                rain: 0,
                snow: 0,

                temp: {
                    current: 0,
                    min: 0,
                    max: 0
                },

                wind: {
                    speed: 0,
                    degree: 0
                }
            }
        }
    }

    componentDidMount()
    {
        this.getWeatherData()
        setInterval(() => { this.getWeatherDataFromPosition(this.state.pos) }, 60000)
    }

    startSpinner() { this.setState({ loaded: 0 }) }

    stopSpinner() { this.setState({ loaded: 1 }) }

    // save position data once
    savePositionData(pos) { this.setState({ pos }) }


    // save the fetched weather data to our state
    saveWeatherData(response)
    {
        let data = response.data

        this.setState({
            weather: {
                id: data.weather[0].id,
                main: data.weather[0].main,
                description: data.weather[0].description,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                clouds: data.clouds.all,
                rain: data.rain,
                snow: data.snow,

                temp: {
                    current: data.main.temp,
                    min: data.main.temp_min,
                    max: data.main.temp_max
                },

                wind: {
                    speed: data.wind.speed,
                    degree: data.wind.deg
                }
            }
        })

        this.setState({ posName: data.name })
    }

    
    // fetch weather data from OpenWeather API
    // with Langitude and Longitude
    getWeatherDataFromPosition(pos)
    {
        const crd = pos.coords

        // create endpoint for OpenWeather API
        let endpoint = 'http://api.openweathermap.org/data/2.5/weather'
            endpoint += '?lat=' + crd.latitude
            endpoint += '&lon=' + crd.longitude
            endpoint += '&units=metric'
            endpoint += '&APPID=' + g_api_key

        console.log('Fetching weather data...')

        // grab weather data with the long and lat values
        axios.get(endpoint)
            .then((response) => {
                console.log('Sucesfully fetched weather data.')
                this.saveWeatherData(response)
                this.stopSpinner()
            })
            .catch((error) => {
                console.warn(error)
            })
    }

    
    // start weather data fetch process
    getWeatherData()
    {
        // start load spinner
        this.startSpinner()

        // set options for position fetch
        const options = {
            enableHighAccuracy: true,
            // timeout: 5000,
            maximumAge: 0
        }

        console.log('Fetching position data...')

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


    setHeight()
    {
        let height = (this.state.baseHeight === '125px') ? '1000px' : '125px'
        this.setState({ baseHeight: height })
    }


    render()
    {
        let weatherInfo = this.state.weather
        let curTemp = Math.round(weatherInfo.temp.current)
        let temp = {
            min: weatherInfo.temp.min,
            max: weatherInfo.temp.max
        }
        let height = { maxHeight: this.state.baseHeight }
        let loadStyle = (this.state.loaded === 1) ? 'loading loaded' : 'loading'

        return (
            <div style={ [styles.base, height] } onClick={this.setHeight.bind(this)}>
                <div className={loadStyle}></div>

                <div style={styles.inner}>
                    <Icon weatherId={weatherInfo.id} />
                    <div style={styles.info}>
                        <h3 style={styles.description}> { weatherInfo.description } </h3>

                        <Data data={curTemp + '˚'} />
                        <Subdata data={temp} />
                    </div>
                </div>

                <InfoDropdown data={weatherInfo}/>
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
        backgroundColor: '#43484a',
        margin: '0 auto 30px',
        padding: '20px',
        textAlign: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        WebkitTransition: 'all .3s ease-in-out',
        transition: 'all .3s ease-in-out'
    },

    inner: {
        position: 'relative',
        zIndex: 3,
        width: '100%'
    },

    info: {
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        verticalAlign: 'top',
        textAlign: 'right',
    },

    description: {
        margin: 0,
        padding: 0,
        fontSize: '1em',
        fontWeight: 300
    }
}