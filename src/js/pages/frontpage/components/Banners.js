// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Weather from './banner/Weather'
import Humidity from './banner/Humidity'


@Radium
export default class Banners extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div style={styles.base}>
                <h3 style={styles.header}>Overzicht</h3>

                <Weather/>
                <Humidity/>
            </div>
        )
    }
}

const styles = {
    base: {
        margin: '50px auto 0',
        width: '100%'
    },

    header: {
        fontWeight: 400,
        marginBottom: '5px'
    }
}