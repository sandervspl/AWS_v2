// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Modal from './Modal'



@Radium
export default class Login extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            doShowModal: 0,
            username: null,
        }
    }

    showModal = () => {
        this.setState({ doShowModal: 1 })
    }

    hideModal = () => {
        this.setState({ doShowModal: 0 })
    }

    setUserName = (username) => {
        this.setState({ username })
    }

    render()
    {
        let username = (this.state.username) ? this.state.username : 'Login'
        let clickFunc = (this.state.username) ? '' : this.showModal

        return (
            <div style={styles.base}>
                <span onClick={clickFunc}>{username}</span>
                <Modal active={this.state.doShowModal} hideModal={this.hideModal} setUserName={this.setUserName} />
            </div>
        )
    }
}


const styles = {
    base: {
        padding: '10px',
        cursor: 'pointer'
    }
}