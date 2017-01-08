// dependencies
const React = require('react')
const Radium = require('radium')

// actions
import * as notificationActions from '../../../actions/NotificationActions'


@Radium
export default class BigButton extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            activated: false
        }
    }

    handleClick = () =>
    {
        if ( ! this.state.activated) {
            let kind = 'alert'
            let msg = 'Alle watertanks worden geleegd.'
            let expiresTime = Date.now() + 5000

            notificationActions.createNotification(kind, msg, expiresTime)
        }

        this.toggleState()
    }

    toggleState = () =>
    {
        this.setState({ activated: !this.state.activated })
    }

    render()
    {
        let stateMsg = 'UIT',
            bucketStyle = styles.img,
            buttonStyle = styles.off

        if (this.state.activated) {
            stateMsg = 'AAN'
            bucketStyle = [styles.img, styles.rotate]
            buttonStyle = styles.on
        }

        return (
            <div style={styles.base}>
                <div style={styles.btn} onClick={this.handleClick}>
                    <div style={ [styles.midCircle, buttonStyle] }>
                        <img src="public/img/bucket_icon_white.png" alt="Bucket" style={bucketStyle}/>
                    </div>
                </div>
                <div style={styles.description}>
                    <p>Drainage Systeem:</p>
                    <p>{stateMsg}</p>
                </div>
            </div>
        )
    }
}


const styles = {
    base: {
        textAlign: 'center'
    },

    btn: {
        position: 'relative',
        margin: '50px auto 0',
        width: '100px',
        height: '100px',
        background: '#eee',
        borderRadius: '50%',

        ':hover': {
            cursor: 'pointer'
        }
    },

    midCircle: {
        position: 'relative',
        top: 'calc(50% - 30px)',
        width: '60px',
        height: '60px',
        margin: 'auto',
        borderRadius: '50%'
    },

    img: {
        position: 'relative',
        width: '27px',
        top: 'calc(50% - 13.5px)',
        transition: 'transform .3s ease-in-out'
    },

    rotate: {
        transform: 'rotateZ(-135deg)'
    },

    description: {
        marginTop: '15px',
    },

    on: {
        background: '#5FE182'
    },

    off: {
        background: '#FF6262'
    }
}