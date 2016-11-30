// dependencies
const React = require('react')
const Radium = require('radium')


@Radium
export default class Waves extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        const id = this.props.id
        const width = this.props.waveWidth

        const animationDelay = { animationDelay: (id / 100) + 's'  }
        const position = { left: id * width + 'px' }

        return (
            <div style={ [
                styles.base,
                animationDelay,
                position
            ] }></div>
        )
    }
}


const waveKeyframes = Radium.keyframes({
    '0%, 100%': {
        height: '30px',
    },

    '50%': {
        height: '10px',
    }
}, 'wave')

const styles = {
    base: {
        background: '#303436',
        display: 'inline-block',
        height: '30px',
        width: '10px',
        position: 'absolute',
        animation: 'x 1.5s ease-in-out infinite forwards',
        animationName: waveKeyframes
    }
}