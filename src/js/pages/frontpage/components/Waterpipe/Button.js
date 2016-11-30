// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class Button extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        let text = (this.props.state === 'on') ? 'Schakel uit' : 'Schakel aan'
        return (
            <button style={[styles.base, styles[this.props.state]]} onClick={this.props.changeState.bind(this)}>
                {text}
            </button>
        )
    }
}

const styles = {
    base: {
        position: 'relative',
        zIndex: 3,
        cursor: 'pointer',
        padding: '6px 12px',
        margin: '10px 0 0',
        backgroundColor: '#333',
        color: '#eee',
        border: '1px solid #eee',
        outline: 'none',

        ':active': {
            top: '1px',
            left: '1px'
        }
    },

    on: {
        color: '#00b3db',
        border: '1px solid #00b3db'
    }
}