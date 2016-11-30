// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class Data extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div style={styles.base}>{this.props.data}</div>
        )
    }
}


const styles = {
    base: {
        fontSize: '2em',
        fontWeight: 900
    }
}