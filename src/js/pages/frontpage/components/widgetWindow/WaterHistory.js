// dependencies
import React, { Component } from 'react'
const ReactDOM = require('react-dom')
const Radium = require('radium')
const Chart = require('chart.js')


@Radium
export default class WaterHistory extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            chart: {}
        }
    }

    componentDidMount()
    {
        this.renderChart()
    }

    renderChart()
    {
        let canvas = ReactDOM.findDOMNode(this.refs.chart)
        let ctx = canvas.getContext('2d')

        // global config
        Chart.defaults.global.defaultFontColor = '#eee'
        Chart.defaults.global.defaultFontFamily = "'Roboto', 'Helvetica', 'sans-serif'"
        Chart.defaults.global.onResize = (chart, newSize) => {
            canvas.style.width = '100%'
            canvas.style.height = '100%'
        }

        // char constructor
        let chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
                datasets: [{
                    label: 'Gemiddeld wateropslag per dag',
                    data: [0, 2, 4, 5, 7, 13, 15],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })

        this.setState({ chart })
    }

    render()
    {
        return (
            <div style={styles.base}>
                <canvas ref="chart" style={styles.canvas}/>
            </div>
        )
    }
}


const styles = {
    base: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '100%'
    },

    canvas: {
        width: '100%',
        height: '100%'
    }
}