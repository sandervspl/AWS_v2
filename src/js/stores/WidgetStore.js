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
    }
    
    getWaterHeight = (id) => this.waterHeights[id]

    setWaterHeight = (id, prct) => 
    {
        this.waterHeights[id] = prct
        this.emit('water_change')
    }

    getAverageHeight = () =>
    {
        return this.waterHeights.reduce((a, b) => { return a + b }) / this.waterHeights.length
    }

    getWaterLevel = (tankId) =>
    {
        const endpoint = `http://${connect.host}:${connect.port.server}/waterlevel/${tankId}`

        axios.get(endpoint)
            .then(data => {
                let level = parseInt(data.data)

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

    handleActions = (action) =>
    {
        switch(action.type)
        {
            case 'FETCH_WATERLEVEL': {
                this.getWaterLevel(action.tankId)
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