// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Title from './components/Title'
import Waterpipe from './components/Waterpipe'
import Banners from './components/Banners'


@Radium
export default class Frontpage extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            state: 'off'
        }
    }

    changeState()
    {
        let state = (this.state.state === 'on') ? 'off' : 'on'
        this.setState({ state })
    }

    render()
    {
        return (
        <div style={styles.wrapper}>
            <div style={styles.systemHeader}>
                <Title style={styles.title} state={this.state.state} />
                <Waterpipe state={this.state.state} changeState={this.changeState.bind(this)}/>
            </div>

            <Banners/>
        </div>
        )
    }
}


const styles = {
    wrapper: {
        minWidth: '305px',
        width: '67%',
        margin: '50px auto'
    },

    systemHeader: {
        position: 'relative',
        width: '100%',
        margin: '10px auto 0'
    },

    title: {
        margin: '30px 0 5px',
        textTransform: 'uppercase',
        textAlign: 'left'
    }
}