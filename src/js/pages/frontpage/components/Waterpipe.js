// dependencies
const React = require('react')
const Radium = require('radium')
import {StyleRoot} from 'radium'

// components
import Waterdrop from './Waterpipe/Waterdrop'
import Button from './Waterpipe/Button'


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
            <StyleRoot>
                <div style={styles.wrapper}>
                    <div style={styles.waterpipe}></div>
                    <Waterdrop state={this.props.state}/>
                </div>

                <Button state={this.props.state} changeState={this.props.changeState.bind(this)}/>
            </StyleRoot>
        )
    }
}


const styles = {
    waterpipe: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '88px',
        height: '50px',
        background: 'transparent url(public/img/water_pipe.png) center/83% no-repeat'
    },

    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    }
}