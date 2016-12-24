// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Watertank from './grid/Watertank'


@Radium
export default class Grid extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    componentDidMount()
    {
        this.tankGrid = []
        let id = 0

        for (let i = 0; i < 3; i += 1) {
            for (let j = 0; j < 3; j += 1) {
                id += 1
                let marginStyle = (j === 2) ? { marginRight: 0 } : { marginRight: '20px' }

                this.tankGrid.push(
                    <Watertank
                        key={id}
                        tankId={id}
                        marginStyle={marginStyle}
                        showNotification={this.props.showNotification}
                    />
                )
            }
        }
    }

    render()
    {
        return (
            <div style={styles.base}>
                <div style={styles.backBtn} onClick={this.props.toggleView}>Terug</div>

                <div style={styles.inner}>
                    {this.tankGrid}

                    <div style={styles.info}>
                        <span style={styles.infoIcon} />
                        Druk op een tank om deze handmatig te draineren.
                    </div>
                </div>
            </div>
        )
    }
}


const styles = {
    base: {
        height: '100%',
        width: '100%',
    },

    inner: {
        position: 'relative',
        top: 'calc(50% - 266px)',
        margin: '0 auto',
        width: '280px',
        whiteSpace: 'normal'
    },

    info: {
        position: 'relative',
        top: '-27px',
        fontSize: '.7em',
        fontWeight: '300',
        textAlign: 'center',
    },

    infoIcon: {
        display: 'inline-block',
        marginRight: '5px',
        width: '11px',
        height: '11px',
        background: 'transparent url(public/img/info_icon_white.png) center / 100% no-repeat'
    },

    backBtn: {
        padding: '10px 10px 0',
        cursor: 'pointer'
    }
}