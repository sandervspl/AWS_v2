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
                    <WidgetButton kind="watertank"/>
                    <WidgetButton kind="grid"/>
                    <WidgetButton
                        kind="weather"
                        weatherData={this.props.weatherData}
                        refreshing={this.props.refreshing}
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