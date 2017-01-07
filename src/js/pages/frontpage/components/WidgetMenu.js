// dependencies
const React = require('react')
const Radium = require('radium')

// components
import WidgetButton from './WidgetButton'


@Radium
export default class WidgetMenu extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div style={styles.base}>
                <ul>
                    <WidgetButton
                        kind="watertank"
                        activateWidgetWindow={this.props.activateWidgetWindow}
                    />
                    <WidgetButton
                        kind="grid"
                        toggleView={this.props.toggleView}
                    />
                    <WidgetButton
                        kind="weather"
                        activateWidgetWindow={this.props.activateWidgetWindow}
                        weatherData={this.props.weatherData}
                    />
                </ul>
            </div>
        )
    }
}


const styles = {
    base: {
        margin: '40px auto 0',
        textAlign: 'center'
    }
}