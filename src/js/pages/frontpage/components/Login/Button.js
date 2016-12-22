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
        return (
            <input type="button" defaultValue="Login" style={styles.base} onClick={this.props.login}/>
        )
    }
}


const styles = {
    base: {
        boxSizing: 'border-box',
        display: 'block',
        width: '100%',
        height: '30px',
        marginBottom: '20px',
        padding: '3px',
        fontSize: '.9em'
    }
}