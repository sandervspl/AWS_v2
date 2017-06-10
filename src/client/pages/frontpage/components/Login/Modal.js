// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Button from './Button'

@Radium
export default class Modal extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            username: '',
            loaded: 0
        }
    }

    handleChange = (event) =>
    {
        this.setState({ username: event.target.value })
    }

    login = () =>
    {
        this.setState({ loaded: 1 })
        setTimeout(() => {
            this.props.setUserName(this.state.username)
            this.props.hideModal()
        }, 1000)
    }

    render()
    {
        let active = (this.props.active) ? 'active' : ''
        let loadStyle = (this.state.loaded) ? 'loading' : 'loading loaded'

        return (
            <div style={ [styles.base, styles[active]] }>
                <div style={styles.modal}>
                    <div className={loadStyle}></div>
                    <form>
                        <input type="text" placeholder="username" value={this.state.username} onChange={this.handleChange} style={styles.input}/>
                        <input type="password" placeholder="password" style={styles.input}/>
                        <Button login={this.login} />
                    </form>
                </div>
            </div>
        )
    }
}


const styles = {
    base: {
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, .5)',
        cursor: 'default'
    },

    modal: {
        boxSizing: 'border-box',
        position: 'fixed',
        top: 'calc(50% - 150px)',
        left: 'calc(50% - 150px)',
        zIndex: 101,
        padding: '50px',
        width: '300px',
        height: '300px',
        background: '#000'
    },

    active: {
        display: 'block'
    },

    input: {
        boxSizing: 'border-box',
        display: 'block',
        width: '100%',
        height: '30px',
        marginBottom: '20px',
        padding: '3px',
        fontSize: '.9em'
    }
}