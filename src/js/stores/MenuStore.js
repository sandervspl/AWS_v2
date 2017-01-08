// dependencies
import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'


class MenuStore extends EventEmitter
{
    constructor(props)
    {
        super(props)
        this.weatherData = {}
        this.position = {}
    }

    getPosition = () => this.position
    getWeatherData = () => this.weatherData

    fetchWeatherData() { this.emit('fetching') }

    saveWeatherData(data)
    {
        this.weatherData = {
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
            (pos) => {
                this.position = pos
                this.emit('change_position_data')
            },
            (err) => {
                console.warn('ERROR(' + err.code + '): ' + err.message)
            },
            options
        )
    }

    handleActions = (action) =>
    {
        switch(action.type)
        {
            case 'FETCH_WEATHER_DATA': {
                this.fetchWeatherData()
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
        }
    }
}

const menuStore = new MenuStore

// dispatcher
Dispatcher.register(menuStore.handleActions)

export default menuStore