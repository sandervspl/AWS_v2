// dependencies
const React = require('react')
const Radium = require('radium')
import {StyleRoot} from 'radium'

// components
import Wave from './Wave'


@Radium
export default class Waves extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            waveWidth: 10,
            waveCount: 0
        }
    }

    componentDidMount()
    {
        // calculate wave components needed for screen width
        const count = Math.floor(window.innerWidth / this.state.waveWidth)

        this.setState({
            waveCount: count
        })
    }

    getHeight()
    {
        return this.props.fillPrct + '%'
    }

    render()
    {
        let waves = []
        for (let i = 0; i < this.state.waveCount; i += 1) {
            waves.push(<Wave key={i} id={i} waveWidth={this.state.waveWidth} />)
        }

        const height = { height: this.getHeight() }
        const bottom = { bottom: this.getHeight() }

        return (
            <StyleRoot>
                <div style={ [styles.storage, height] }></div>
                <div style={ [styles.waves, bottom] }> { waves } </div>
            </StyleRoot>
        )
    }
}


const styles = {
    waves: {
        position: 'absolute',
        left: 0,
        zIndex: 2,
        width: '100%',
        minHeight: '10px',
        backgroundColor: '#3689ee',
        transition: 'bottom 1s ease-in-out'
    },

    storage: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 1,
        width: '100%',
        backgroundColor: '#3689ee',
        transition: 'height 1s ease-in-out'
    }
}