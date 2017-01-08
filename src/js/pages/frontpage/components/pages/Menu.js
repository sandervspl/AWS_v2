// dependencies
const React = require('react')
const Radium = require('radium')

// components
import BigButton from '../BigButton'
import Logo from '../Logo'
import WidgetMenu from '../WidgetMenu'
import WidgetWindow from '../WidgetWindow'

// stores
import menuStore from '../../../../stores/MenuStore'

// actions
import * as menuActions from '../../../../actions/MenuActions'


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
            refreshingWeather: true,
            weatherData: {
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

    componentWillMount()
    {
        menuStore.on('fetching', () => {
            console.log('fetching menu data...')
            this.startRefreshSpinner()
        })

        menuStore.on('fail', () => {
            this.stopRefreshSpinner()
        })

        menuStore.on('change_position_data', () => {
            this.setState({ pos: menuStore.getPosition() })
            this.getWeatherDataFromPosition(this.state.pos)
        })

        menuStore.on('change_weather_data', () => {
            this.setState({ weatherData: menuStore.getWeatherData() })
            this.stopRefreshSpinner()
        })

        // start weather fetching process by fetching position data
        menuActions.getPositionData()

        // fetch new weather data every minute
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
    startRefreshSpinner() { this.setState({ refreshingWeather: true }) }

    // stop refreshing state
    stopRefreshSpinner() { this.setState({ refreshingWeather: false }) }

    // fetch weather data from OpenWeather API
    // with Langitude and Longitude
    getWeatherDataFromPosition(pos)
    {
        const crd = pos.coords

        if (typeof crd === 'undefined')
            return

        this.startRefreshSpinner()
        menuActions.getWeatherData(crd.latitude, crd.longitude)
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
                    refreshing={this.state.refreshingWeather}
                />
                <BigButton
                    showNotification={this.props.showNotification}
                    hideNotification={this.props.hideNotification}
                />
                <WidgetWindow
                    active={this.state.widgetActive}
                    kind={this.state.widgetKind}
                    weatherData={this.state.weatherData}
                    refreshing={this.state.refreshingWeather}
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