// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class Waterpipe extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div style={ [
                styles.base,
                styles[this.props.state]
            ] }></div>
        )
    }
}


const fallKeyframes = Radium.keyframes({
    '0%': {
        top: '42px',
    },

    '80%, 100%': {
        top: '240px'
    }
}, 'fall')

const styles = {
    base: {
        display: 'none',
        position: 'absolute',
        top: '42px',
        right: '65px',
        width: '20px',
        height: '20px',
        background: 'transparent url(public/img/water_drop.png) center/63% no-repeat'
    },

    on: {
        display: 'block',
        animation: 'x 1.15s cubic-bezier(0.98, 0.01, 0.91, 0.94) infinite',
        animationName: fallKeyframes,
    },

    '@keyframes waterdropFall': {
        '0%': {
            top: '42px',
        },

        '80%, 100%': {
            top: '190px'
        }
    }
}