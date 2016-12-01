// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class InfoDropdown extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        let { data } = this.props
        let windSpeed = (data.wind.speed * 3.6).toFixed(2) // convert to km/h
        let windDegree = data.wind.degree
        let windAngle = ''

        if (windDegree > 78 && windDegree < 168) windAngle = 'Oost'
        else if (windDegree > 168 && windDegree < 258) windAngle = 'Zuid'
        else if (windDegree > 258 && windDegree < 348) windAngle = 'West'
        else windAngle = 'Noord'

        return (
            <div style={styles.base}>
                <table style={styles.table}>
                    <tbody>
                        <tr>
                            <td style={styles.dataTitle}>Bewolking</td>
                            <td style={styles.dataValue}>{ data.clouds }%</td>
                        </tr>
                        <tr>
                            <td style={styles.dataTitle}>Luchtdruk</td>
                            <td style={styles.dataValue}>{ data.pressure } hPa</td>
                        </tr>
                        <tr>
                            <td style={styles.dataTitle}>Luchtvochtigheid</td>
                            <td style={styles.dataValue}>{ data.humidity }%</td>
                        </tr>
                        <tr>
                            <td style={styles.dataTitle}>Windsnelheid</td>
                            <td style={styles.dataValue}>{ windSpeed } km/h</td>
                        </tr>
                        <tr>
                            <td style={styles.dataTitle}>Richting</td>
                            <td style={styles.dataValue}>{ windAngle }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


const styles = {
    base: {
        borderTop: '1px solid #eee',
        margin: '35px 0 0',
        padding: '20px'
    },

    table: {
        margin: '0 auto'
    },

    dataTitle: {
        textAlign: 'left',
        padding: '0 50px 5px 0'
    },

    dataValue: {
        textAlign: 'right'
    }
}