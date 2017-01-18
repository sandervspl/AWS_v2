// dependencies
import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'
const axios = require('axios')

// vars
import * as vars from '../secret/vars'
import * as connect from '../secret/connect'


class MenuStore extends EventEmitter
{
    constructor(props)
    {
        super(props)
        this.weatherData = {}
        this.position = {}
        this.bigButtonState = false
    }

    getPosition = () => this.position
    getWeatherData = () => this.weatherData

    fetch() { this.emit('fetching') }
    fail() { this.emit('fail') }

    fetchWeatherData = (lat, lon) =>
    {
        // create endpoint for OpenWeather API
        let endpoint = 'http://api.openweathermap.org/data/2.5/weather'
        endpoint += '?lat=' + lat
        endpoint += '&lon=' + lon
        endpoint += '&units=metric'
        endpoint += '&APPID=' + vars.WeatherApiKey

        // fetch weather data from openweather api with the long and lat values
        axios.get(endpoint)
            .then(
                data => this.saveWeatherData(data.data)
            )
            .catch(
                error => {
                console.warn(error)
                this.fail()
            })
    }

    saveWeatherData(data)
    {
        this.weatherData = {
            id: data.weather[0].id,
            posName: data.name,
            humidity: data.main.humidity,
            temp: data.main.temp,
            wind: {
                speed: data.wind.speed,
                angle: data.wind.deg
            }
        }

        this.emit('change_weather_data')
    }

    getPositionData()
    {
        // set options for position fetch
        const options = {
            enableHighAccuracy: true,
            // timeout: 10000,
            maximumAge: 0
        }

        // fetch current position data
        navigator.geolocation.getCurrentPosition(
            pos => {
                this.position = pos
                this.emit('change_position_data')
            },
            err => {
                console.warn('ERROR(' + err.code + '): ' + err.message)
                this.fail()
            },
            options
        )
    }

    getBigButtonState = () => this.bigButtonState


    fetchBigButtonState = () =>
    {
        axios.get(`http://${connect.host}:${connect.port.server}/getbigbutton`)
            .then(response => {
                this.bigButtonState = parseInt(response.data)
                this.emit('bigbutton_state_change')
            })
            .catch(err => {
                console.warn('could not fetch big button state on server: ' + err)
                this.emit('fail')
            })
    }

    setBigButtonState = (state) =>
    {
        const endpoint = `http://${connect.host}:${connect.port.server}/setbigbutton`
        const options = { state }

        axios.post(endpoint, options)
            .then(response => {
                this.bigButtonState = parseInt(response.data)
                this.emit('bigbutton_state_change')
            })
            .catch(err => {
                console.warn('could not set big button state on server: ' + err)
                this.emit('fail')
            })
    }

    handleActions = (action) =>
    {
        switch(action.type)
        {
            case 'FETCH': {
                this.fetch()
                break
            }

            case 'FETCH_WEATHER_DATA': {
                this.fetchWeatherData(action.lat, action.lon)
                break
            }

            case 'GET_SUCCESS_WEATHER_DATA': {
                this.saveWeatherData(action.data)
                break
            }

            case 'FETCH_POSITION_DATA': {
                this.getPositionData()
                break
            }

            case 'SET_BIGBUTTON_STATE': {
                this.setBigButtonState(action.state)
                break
            }

            case 'FETCH_BIGBUTTON_STATE': {
                this.fetchBigButtonState()
                break
            }
        }
    }
}

const menuStore = new MenuStore

// dispatcher
Dispatcher.register(menuStore.handleActions)

export default menuStore