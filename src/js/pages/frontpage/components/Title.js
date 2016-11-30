// dependencies
const React = require('react')
const Radium = require('radium')


@Radium
export default class Title extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        let statusText = (this.props.state === 'on') ? 'AAN' : 'UIT'
        return (
            <div>
                <h2 style={styles.h2}>SYSTEEM STAAT</h2>
                <h1 style={[styles.h1, styles[this.props.state]]}>{statusText}</h1>
            </div>
        )
    }
}


const styles = {
    base: {
        textAlign: 'left',
        margin: 0,
        padding: 0
    },

    h1: {
        fontWeight: '900',
        fontSize: '4em',
        marginTop: '-20px',
        transition: 'color .2s linear',
        textTransform: 'uppercase'
    },

    h2: {
        fontWeight: '300'
    },

    on: {
        color: '#00b3db'
    }
}