// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Watertank from './widgets/Watertank'
import Grid from './widgets/Grid'
import Weather from './widgets/Weather'

// actions
import * as widgetWindowActions from '../../../actions/WidgetWindowActions'
import * as navbarActions from '../../../actions/NavbarActions'

// store
import widgetWindowStore from '../../../stores/WidgetWindowStore'


@Radium
export default class WidgetButton extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    handeClick = () =>
    {
        if (this.props.kind === 'grid') {
            let time = 0

            // close widget window, if active, before going to new view
            if (widgetWindowStore.getWindow().active) {
                widgetWindowActions.closeWidgetWindow()
                time = 325
            }

            setTimeout(
                () => navbarActions.navFromTo('menu', 'grid'),
                time
            )
        } else {
            this.toggleActive()
        }
    }

    toggleActive = () => this.activateWindow()

    activateWindow = () => widgetWindowActions.toggleWidgetWindow(this.props.kind)

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
        verticalAlign: 'top',
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