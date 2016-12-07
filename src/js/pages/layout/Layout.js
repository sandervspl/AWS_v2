// dependencies
const React = require('react')

export default class Layout extends React.Component {
    render() {
        return (
            <div id="layout" style={styles.base}>
                {this.props.children}
            </div>
        )
    }
}

const styles = {
    base: {
        width: '100%',
        height: '100%'
    }
}