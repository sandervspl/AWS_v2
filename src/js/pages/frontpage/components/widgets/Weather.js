// dependencies
const React = require('react')
const Radium = require('radium')


@Radium
export default class Weather extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    componentWillMount()
    {
        this.setState({ weatherData: this.props.weatherData })
    }

    render()
    {
        let { weatherData } = this.props
        let loadStyle = (this.props.refreshing === false) ? 'loading loaded' : 'loading'

        return (
            <div style={styles.base}>
                <div className={loadStyle}></div>
                <div style={styles.icon}>
                    <img src="public/img/cloudy.png" alt="weather" style={styles.img}/>
                </div>
                <div style={styles.temp}> {(weatherData.temperature.temp).toFixed(0)}º </div>
            </div>
        )
    }
}


const styles = {
    base: {
        marginTop: '5px'
    },

    icon: {
        height: '22px'
    },

    img: {
        height: '100%'
    },

    temp: {
        color: '#000000',
        fontSize: '1.15em'
    }
}