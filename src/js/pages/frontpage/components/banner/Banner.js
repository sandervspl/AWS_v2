// dependencies
const React = require('react')
const Radium = require('radium')


@Radium
export default class Weather extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            kind: this.props.kind,
            title: this.props.title,
            value: 0
        }
    }

    render()
    {
        return (
            <div className="info-container rain">
                <div className="inner">
                    <div className="icon"></div>
                    <div className="text">
                        <h3>{this.state.title}</h3>
                        <Data data={this.state.prct + '%'}/>

                    </div>
                </div>

                <Fill kind={this.state.kind} val={this.state.value}/>
            </div>
        )
    }
}