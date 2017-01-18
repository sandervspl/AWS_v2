// dependencies
import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'
const axios = require('axios')
import * as connect from '../secret/connect'


class WidgetStore extends EventEmitter
{
    constructor(props)
    {
        super(props)
        this.waterHeights = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.stationGateStates = [false, false, false, false, false, false, false, false, false]
    }


    /// water height
    getWaterHeight = (id) => this.waterHeights[id]

    getAverageHeight = () =>
    {
        return this.waterHeights.reduce((a, b) => { return a + b }) / this.waterHeights.length
    }

    setWaterHeight = (id, prct) => 
    {
        this.waterHeights[id] = prct
        this.emit('water_change')
    }

    getWaterLevel = (tankId) =>
    {
        const endpoint = `http://${connect.host}:${connect.port.server}/waterlevel/${tankId}`

        axios.get(endpoint)
            .then(response => {
                let level = parseInt(response.data)

                // no connection with serialport is found
                if ( ! level || level === null) {
                    this.emit('fail')
                    return
                }

                // convert our value to a percentage
                // let val = 100 - level
                let val = 130 - 13 * level / 10
                if (val > 100) val = 100
                if (val < 0) val = 0

                val = parseInt(val)

                // save water height data
                this.setWaterHeight(tankId, val)
            })
            .catch(err => {
                console.warn('could not fetch water level data from server: ' + err)
                this.emit('fail')
            })
    }


    /// water tank state
    getGateState = (id) => this.stationGateStates[id]

    setGateState = (id, state) =>
    {
        this.stationGateStates[id] = state
        this.emit('gate_change')
    }

    setStationGateState = (tankId, state, singleGate = true) =>
    {
        const endpoint = state
            ? `http://${connect.host}:${connect.port.server}/opengate/${tankId}`
            : `http://${connect.host}:${connect.port.server}/closegate/${tankId}`

        axios.get(endpoint)
            .then(response => {
                this.stationGateStates[tankId] = response.data

                if (singleGate) this.emit('gate_change')
            })
            .catch(err => {
                console.warn('could not set watertank gate state on server: ' + err)
                this.emit('fail')
            })
    }

    getStationGateState = (tankId) =>
    {
        const endpoint = `http://${connect.host}:${connect.port.server}/gatestate/${tankId}`

        axios.get(endpoint)
            .then(response => {
                let state = response.data

                // no connection with serialport is found
                if (state === null) {
                    this.emit('fail')
                    return
                }

                // save water height data
                this.setGateState(tankId, state)
            })
            .catch(err => {
                console.warn('could not fetch watertank gate state from server: ' + err)
                this.emit('fail')
            })
    }

    setAllstationGateStates(state)
    {
        this.stationGateStates.forEach((gate, index) => {
            this.setStationGateState(index, state, false)

            if (index === this.stationGateStates.length - 1)
                setTimeout(() => { this.emit('gate_change_all') }, 100)
        })
    }

    handleActions = (action) =>
    {
        switch(action.type)
        {
            case 'FETCH_WATERLEVEL': {
                this.getWaterLevel(action.tankId)
                break
            }

            case 'FETCH_WATERTANK_GATE_STATE': {
                this.getStationGateState(action.tankId)
                break
            }

            case 'SET_WATERTANK_GATE_STATE': {
                this.setStationGateState(action.tankId, action.state)
                break
            }

            case 'SET_ALL_GATE_STATES': {
                this.setAllstationGateStates(action.state)
                break
            }
        }
    }
}

const widgetStore = new WidgetStore

// dispatcher
Dispatcher.register(widgetStore.handleActions)
window.widgetStore = widgetStore

export default widgetStore