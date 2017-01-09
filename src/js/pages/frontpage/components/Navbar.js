// dependencies
const React = require('react')
const Radium = require('radium')

// actions
import * as NavbarActions from '../../../actions/NavbarActions'

// stores
import navbarStore from '../../../stores/NavbarStore'


@Radium
export default class Topbar extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            viewName: 'grid',
            leftText: '<'
        }
    }

    componentWillMount()
    {
        navbarStore.on('view_change', () => {
            this.setState({
                leftText: `< ${navbarStore.getBackBtn().title}`
            })
        })
    }

    handleBackBtnClick = () => NavbarActions.navFromTo(this.state.viewName, 'menu')

    render()
    {
        let backBtn = navbarStore.getBackBtn().active
            ? <span style={styles.btnActive} onClick={this.handleBackBtnClick}>{this.state.leftText}</span>
            : <span style={styles.btnInactive}>{this.state.leftText}</span>

        return (
            <div style={styles.base}>
                <div style={ [styles.item, styles.left] }>
                    {backBtn}
                </div>
                <div style={ [styles.item, styles.title] }>
                    <span>{this.props.title}</span>
                </div>
                <div style={ [styles.item, styles.right] }/>
            </div>
        )
    }
}


const styles = {
    base: {
        position: 'fixed',
        zIndex: 101,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 'auto',
        height: '35px',
        width: '100%',
        background: '#EEE'
    },

    item: {
        display: 'flex',
        flexGrow: 1,
        color: 'black',
        textTransform: 'capitalize',
        fontWeight: 400
    },

    title: {
        flexGrow: 2,
        justifyContent: 'center'
    },

    left: {
        paddingLeft: '20px',
        justifyContent: 'flex-start'
    },

    right: {
        paddingRight: '20px',
        justifyContent: 'flex-end'
    },

    btnActive: {
        cursor: 'pointer'
    },

    btnInactive: {
        cursor: 'default',
        color: 'lightgrey'
    }
}