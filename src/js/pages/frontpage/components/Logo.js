// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class Logo extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div style={styles.base}>
                <img src="public/img/logo_white.png" alt="Logo" style={styles.img}/>
            </div>
        )
    }
}


const styles = {
    base: {
        width: '76px',
        height: '96px',
        margin: 'auto',
        overflow: 'hidden'
    },

    img: {
        height: '100%'
    }
}