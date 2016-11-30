// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class Fill extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div style={[
                styles.base,
                styles[this.props.kind],
                { height: this.props.val + '%' }
            ]}></div>
        )
    }
}


const styles = {
    base: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        left: 0,
        width: '100%',
        height: 0,
        minHeight: '1%',
        transition: 'height 1s ease-in-out'
    },

    weather: {
        backgroundColor: '#3689ee'
    },

    humidity: {
        backgroundColor: '#aacedb'
    }
}