// dependencies
const React = require('react')
const Radium = require('radium')

// components
import BigButton from '../BigButton'
import Logo from '../Logo'
import WidgetMenu from '../WidgetMenu'
import WidgetWindow from '../WidgetWindow'

@Radium
export default class Menu extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            widgetActive: false,
            widgetKind: null,
        }
    }

    activateWidgetWindow = (active, kind) =>
    {
        this.setState({
            widgetActive: active,
            widgetKind: kind
        })
    }

    render()
    {
        return (
            <div style={styles.base}>
                <Logo />
                <WidgetMenu
                    activateWidgetWindow={this.activateWidgetWindow}
                    toggleView={this.props.toggleView}
                />
                <BigButton
                    showNotification={this.props.showNotification}
                    hideNotification={this.props.hideNotification}
                />
                <WidgetWindow
                    active={this.state.widgetActive}
                    kind={this.state.widgetKind}
                />
            </div>
        )
    }
}


const styles = {
    base: {
        padding: '20px 0 0',
        height: '100%',
        width: '100%',
    }
}