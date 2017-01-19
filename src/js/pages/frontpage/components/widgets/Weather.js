// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Icon from './Weather/Icon'


@Radium
export default class Weather extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        const { weatherData } = this.props
        const loadStyle =  ! this.props.refreshing ? 'loading loaded' : 'loading'
        const tempBgStyle = weatherData.temp >= 10 ? styles.hot : styles.cold

        return (
            <div style={ [styles.base, tempBgStyle] }>
                <div className={loadStyle} style={styles.customLoader}></div>
                <Icon weatherId={this.props.weatherData.id}/>
                <div style={styles.temp}> {(weatherData.temp).toFixed(0)}º </div>
            </div>
        )
    }
}


const styles = {
    base: {
        position: 'relative'
    },

    hot: {
        background: 'radial-gradient(rgba(255, 255, 135, 0.75), rgba(255, 157, 24, 0.75))'
    },

    cold: {
        background: 'radial-gradient(rgba(121, 152, 249, 0.5), rgba(135, 247, 255, 0.5))'
    },

    temp: {
        color: '#000000',
        fontSize: '1.15em',
        textShadow: '2px 1px 6px rgba(0,0,0,0.5)'
    }
}