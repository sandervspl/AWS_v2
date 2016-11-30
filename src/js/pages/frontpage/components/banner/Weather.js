// dependencies
const React = require('react')
const Radium = require('radium')
const axios = require('axios')

// components
import Fill from './components/Fill'
import Data from './components/Data'

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

            pos: {},
            posName: '',

            weather: {
                id: 0,
                main: '',
                description: '',
                pressure: 0,
                humidity: 0,
                clouds: 0,

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


    render()
    {
        let loadStyle = (this.state.loaded === 1) ? styles.loaded : {}
        let curTemp = Math.round(this.state.weather.temp.current)

        return (
            <div style={styles.wrapper}>
                <div className="loading" style={loadStyle}></div>

                <div style={styles.inner}>
                    <div style={[styles.info, styles.icon]}></div>
                    <div style={styles.info}>
                        <h3 style={styles.description}>{this.state.weather.description}</h3>
                        <Data data={curTemp + '˚C'}/>
                    </div>
                </div>

                <Fill kind={this.state.kind} val={this.state.value}/>
            </div>
        )
    }
}


const styles = {
    wrapper: {
        position: 'relative',
        zIndex: 1,
        height: '100px',
        width: '100%',
        backgroundColor: '#43484a',
        margin: '0 auto 30px',
        padding: '10px',
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
        left: '10px',
        width: '70px',
        height: '75px',
        background: 'url(public/img/rain-icon.png) center/100% no-repeat'
    },

    description: {
        margin: 0,
        padding: 0,
        fontSize: '1em',
        fontWeight: 300
    },
    
    loaded: {
        background: 'rgba(0, 0, 0, 0)'
    }
}