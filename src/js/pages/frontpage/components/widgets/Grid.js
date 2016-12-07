// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class Grid extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div style={styles.base}>
                <img src="public/img/grid.png" alt="grid" style={styles.img}/>
            </div>
        )
    }
}


const styles = {
    base: {
        position: 'relative',
        textAlign: 'center',
        top: 'calc(50% - 18px)'
    },

    img: {
        width: '75%',
    }
}