// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Weather from './widgetWindow/Weather'
import WaterHistory from './widgetWindow/WaterHistory'

// stores
import widgetWindowStore from '../../../stores/WidgetWindowStore'


@Radium
export default class WidgetWindow extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            active: false,
            kind: null
        }
    }

    componentWillMount()
    {
        widgetWindowStore.on('toggle_widget_window', () => {
            const ww = widgetWindowStore.getWindow()

            this.setState({
                active: ww.active,
                kind: ww.kind
            })
        })
    }

    getWidgetComponent()
    {
        switch (this.state.kind)
        {
            case 'watertank': {
                return <WaterHistory/>
            }

            case 'weather': {
                return <Weather
                    weatherData={this.props.weatherData}
                    refreshing={this.props.refreshing}
                />
            }

            default: {
                return null
            }
        }
    }

    render()
    {
        let widget = this.getWidgetComponent()
        let active = (this.state.active) ? 'active' : ''

        return (
            <div style={ [styles.base, styles[active]] }>
                {widget}
            </div>
        )
    }
}


const styles = {
    base: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '175px',
        background: 'linear-gradient(-45deg, rgb(47, 54, 58) 0%, rgb(55, 67, 74) 36%, rgb(47, 54, 58) 100%)',
        borderTop: '1px solid rgb(141, 141, 141)',
        overflow: 'hidden',
        transform: 'translateY(176px)',
        transition: 'transform .3s cubic-bezier(.825, 0, .5, 1)'
    },

    active: {
        transform: 'translateY(0)'
    }
}