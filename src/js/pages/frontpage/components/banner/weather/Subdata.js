// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class Subdata extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        let min = this.props.data.min
        let max = this.props.data.max
        return (
            <div>
                <span>{min}˚ / {max}˚</span>
            </div>
        )
    }
}


const styles = {
    base: {
        
    }
}