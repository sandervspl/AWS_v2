// dependencies
import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'
const axios = require('axios')


class WidgetStore extends EventEmitter
{
    constructor(props)
    {
        super(props)
        this.waterHeight = 0
    }
    
    getWaterHeight = () => this.waterHeight

    getWaterLevel = (tankId) =>
    {
        const endpoint = `http://localhost:3000/waterlevel/${tankId}`

        axios.get(endpoint)
            .then(data => {
                let level = data.data

                // no connection with serialport is found
                if ( ! level || level === null) {
                    this.emit('fail')
                    return
                }

                // convert our value to a percentage
                let val = 100 - level
                if (val > 100) val = 100
                if (val < 0) val = 0

                // save water height data
                this.waterHeight = val

                this.emit('water_change')
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

export default widgetStore