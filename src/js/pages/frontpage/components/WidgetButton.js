// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Watertank from './widgets/Watertank'
import Grid from './widgets/Grid'
import Weather from './widgets/Weather'


@Radium
export default class WidgetButton extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            active: false
        }
    }

    handeClick = () =>
    {
        if (this.props.kind === 'grid') {
            this.props.toggleView()
        } else {
            this.toggleActive()
        }
    }

    toggleActive = () =>
    {
        this.state.active = !this.state.active
        this.activateWindow()
    }

    activateWindow = () =>
    {
        this.props.activateWidgetWindow(this.state.active, this.props.kind)
    }

    render()
    {
        let button = null;
        let tag = '';

        switch(this.props.kind)
        {
            case 'watertank':
                button = <Watertank/>
                tag = ''
                break

            case 'grid':
                button = <Grid/>
                tag = ''
                break

            case 'weather':
                button = <Weather
                            weatherData={this.props.weatherData}
                            refreshing={this.props.refreshing}
                />
                tag = ''
                break
        }

        return (
            <li
                style={ [styles.base, styles[this.props.kind]] }
                className="widget-btn"
                onClick={this.handeClick}
            >
                {button}
                <span>{tag}</span>
            </li>
        )
    }
}


const styles = {
    base: {
        position: 'relative',
        display: 'inline-block',
        width: '70px',
        height: '70px',
        lineHeight: '50px',
        overflow: 'hidden',
        textAlign: 'center',

        ':hover': {
            cursor: 'pointer'
        },
    },

    watertank: {
        borderRadius: '50%',
        background: '#eee'
    },

    grid: {

    },

    weather: {
        borderRadius: '50%',
        background: '#eee'
    }
}