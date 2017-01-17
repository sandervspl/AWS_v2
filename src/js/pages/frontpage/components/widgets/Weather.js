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
        let { weatherData } = this.props
        let loadStyle = (this.props.refreshing === false) ? 'loading loaded' : 'loading'

        return (
            <div>
                <div className={loadStyle}></div>
                <Icon weatherId={this.props.weatherData.id}/>
                <div style={styles.temp}> {(weatherData.temp).toFixed(0)}º </div>
            </div>
        )
    }
}


const styles = {
    temp: {
        color: '#000000',
        fontSize: '1.15em'
    }
}