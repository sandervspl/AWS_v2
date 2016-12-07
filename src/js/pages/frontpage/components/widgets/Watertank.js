// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class Watertank extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div>
                <div style={styles.fill}/>
                <div style={styles.prct}>30%</div>
            </div>
        )
    }
}


const styles = {
    fill: {
        position: 'absolute',
        bottom: 0,
        background: '#2789BA',
        height: '30%',
        width: '100%',
    },

    prct: {
        fontSize: '14px',
        fontWeight: '200',
        color: '#000000',
        lineHeight: '50px'
    }
}