// dependencies
const React = require('react')
const Radium = require('radium')

const logoImg = require('assets/img/logo_white.png');

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
                <img src={logoImg} alt="Logo" style={styles.img}/>
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