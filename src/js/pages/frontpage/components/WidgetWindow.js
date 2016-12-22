// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Weather from './widgetWindow/Weather'


@Radium
export default class WidgetWindow extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    getWidgetComponent()
    {
        switch (this.props.kind)
        {
            case 'weather':
                return <Weather weatherData={this.props.weatherData} />
                break

            default:
                return null
                break
        }
    }

    render()
    {
        let widget = this.getWidgetComponent()
        let active = (this.props.active) ? 'active' : ''

        return (
            <div style={ [styles.base, styles[active]] }>
                {widget}
            </div>
        )
    }
}


const styles = {
    base: {
        position: 'absolute',
        bottom: '40px',
        left: 0,
        width: '100%',
        height: '175px',
        background: '#474C4E',
        borderTop: '1px solid rgb(141, 141, 141)',
        overflow: 'hidden',
        transform: 'translateY(176px)',
        transition: 'transform .3s cubic-bezier(.825, 0, .5, 1)'
    },

    active: {
        transform: 'translateY(0)'
    }
}