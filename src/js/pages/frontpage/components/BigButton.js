// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class BigButton extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            state: 'off'
        }
    }

    handleClick = () =>
    {
        if (this.state.state === 'off') {
            let kind = 'alert'
            let msg = 'Alle watertanks worden geleegd.'

            this.props.showNotification(kind, msg, 0)
        } else {
            this.props.hideNotification()
        }

        this.toggleState()
    }

    toggleState = () =>
    {
        let state = (this.state.state === 'on') ? 'off' : 'on'
        this.setState({ state })
    }

    render()
    {
        let state = (this.state.state === 'on') ? 'AAN' : 'UIT'
        let bucketStyle = (this.state.state === 'on') ? [styles.img, styles.rotate] : styles.img

        return (
            <div style={styles.base}>
                <div style={styles.btn} onClick={this.handleClick}>
                    <div style={ [styles.midCircle, styles[this.state.state]] }>
                        <img src="public/img/bucket_icon_white.png" alt="Bucket" style={bucketStyle}/>
                    </div>
                </div>
                <div style={styles.description}>
                    <p>Drainage Systeem:</p>
                    <p>{state}</p>
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