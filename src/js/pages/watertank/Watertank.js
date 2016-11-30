// dependencies
const React = require('react')
const Radium = require('radium')

// components
import Waves from './components/Waves'
import Title from './components/Title'

@Radium
export default class Weather extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            title: 'Water Reservoir',
            fillPrct: 20
        }
    }

    render()
    {
        return (
            <div>
                <div className="title-water-storage"> { this.state.title } </div>

                <div className="storage-text">
                    <Title fillPrct={this.state.fillPrct}/>
                </div>

                <Waves fillPrct={this.state.fillPrct} />
            </div>
        )
    }
}