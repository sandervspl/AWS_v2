// dependencies
const React = require('react')
const Radium = require('radium')

@Radium
export default class Title extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        let prct = this.props.fillPrct + '%'
        return (
            <h1 className="prct"> { prct } </h1>
        )
    }
}