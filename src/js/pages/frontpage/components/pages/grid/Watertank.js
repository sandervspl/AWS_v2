// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class Watertank extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            active: false
        }
    }

    toggleActive = () =>
    {
        this.state.active = !this.state.active
        this.notification()
    }

    notification = () =>
    {
        if (this.state.active) {
            let msg = '(Watertank ' + this.props.tankId + ') wordt gedraineerd.'
            this.props.showNotification('success', msg)
        } else {
            let msg = '(Watertank ' + this.props.tankId + ') is gestopt.'
            this.props.showNotification('alert', msg)
        }
    }

    render()
    {
        let current = this.props.current
        let capacity = this.props.capacity
        let prct = (current / capacity * 100).toFixed(0)

        let fillWidth = { width: prct + '%' }

        let warningStyle = null
        let warningMsg = ''
        if (prct >= 80) {
            warningStyle = styles.warning
            warningMsg = 'Bijna vol!'
        }

        let activeStyle = (this.state.active) ? styles.on : ''
        
        let title = 'Tank ' + this.props.tankId

        return (
            <div style={ [styles.base, this.props.marginStyle, activeStyle] } onClick={this.toggleActive}>
                <div style={styles.title}>
                    {title}
                </div>

                <div style={warningStyle}>
                    {warningMsg}
                </div>

                <div style={styles.data}>
                    <div style={styles.prct}>{prct}%</div>
                    <div style={styles.curCap}>{current}L / {capacity}L</div>
                </div>

                <div style={styles.fillBg}>
                    <div style={ [styles.fill, fillWidth] }></div>
                </div>
            </div>
        )
    }
}


const styles = {
    base: {
        position: 'relative',
        display: 'inline-block',
        marginBottom: '60px',
        width: '70px',
        height: '80px',
        verticalAlign: 'top',
        background: '#E49B51',
        textAlign: 'center',
        boxShadow: '0 2px 1px 0 rgba(0,0,0,0.5)',
        cursor: 'pointer',
    },

    on: {
        background: '#7AD98A',
    },

    title: {
        position: 'absolute',
        top: '-21px',
        left: 0,
        right: 0,
        fontSize: '12px'
    },

    warning: {
        position: 'absolute',
        width: '100%',
        height: '15px',
        background: '#DA4747',
        textAlign: 'center',
        fontSize: '9px',
        lineHeight: '15px'
    },

    data: {
        position: 'relative',
        top: 'calc(50% - 20.5px)'
    },

    prct: {
        fontSize: '21px',
        fontWeight: '500'
    },

    curCap: {
        fontSize: '10px',
        fontWeight: '300'
    },

    fillBg: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '10px',
        background: '#eee',
    },

    fill: {
        position: 'absolute',
        top: 0,
        left: 0,
        background: '#2689BA',
        height: '100%',
        maxWidth: '100%',
        minWidth: '1%',
    }
}