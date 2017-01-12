// dependencies
const Express = require('express')
const SerialPort = require('serialport')
const bodyParser = require('body-parser')

import Station from './Station'

// server
const app = new Express()

class Server
{
    constructor()
    {
        this.stations = []
        this.serialport = null

        this.init()
        this.routes()
    }



    /* ======================================= */
    // SERVER INITIALIZATION
    /* ======================================= */

    // initialize express server
    init()
    {
        // block the header from containing information about the server
        app.disable('x-powered-by')

        // body parser —to be able to read body content
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        
        // open serialport
        // console.log('opening serial port...')
        this.openSerialport()

        // start watergate check interval
        // console.log('starting watergate interval...')
        setInterval(this.shouldWaterGateOpen, 1000)

        // create some stations
        // console.log('creating stations...')
        this.createStations(10)

        // routes
        // console.log('setting routes...')
        this.routes()

        // start server!
        // console.log('starting server...')
        this.startServer()

        // setInterval(() => {
        //     this.writeToSerialPort('g1')
        //     setTimeout(() => this.writeToSerialPort('g0'), 1000)
        // }, 2000)
    }

    openSerialport()
    {
        // serialport
        this.serialport = new SerialPort('/dev/cu.usbmodem1411', { parser: SerialPort.parsers.readline('\n') })

        this.serialport
            .on('error', err => { console.log('Serial Port could not be opened:', err) })
            .on('open', () => { console.log('Serial Port Opened') })
            .on('data', data => {(data)
                // data looks something like this
                // UIDw45

                console.log(data)

                // grab uid from char [0] to [3]
                const uid = data.slice(0, 3) // grab uid

                for (let [id, station] of this.stations.entries())
                {
                    const length = this.stations.length - 1

                    if (station.uid !== uid) {
                        // if we come this far we might have a new station that should be installed
                        if (id === length) {
                            this.initNewStation(uid)
                            break
                        }

                        continue
                    }

                    // value is placed after uid and its data mark (so we cut away 'UIDw' for example)
                    const val = data.slice(4, data.length)

                    // [3] is the data mark so we can identify what data we are receiving
                    if (data[3] === 'w')
                            this.stations[id].setWaterLevel(val)

                    if (data[3] === 'h')
                        this.stations[id].setHumidityLevel(val)
                }
            })
    }

    writeToSerialPort = (str) =>
    {

        // Sending String character by character
        for(let i = 0; i < str.length; i += 1){
            this.serialport.write(new Buffer(str[i], 'ascii'), function(err, results) {
                // console.log('Error: ' + err);
                // console.log('Results ' + results);
            });
        }

        // Sending the terminate character
        this.serialport.write(new Buffer('#', 'ascii'), function(err, results) {
            // console.log('err ' + err);
            // console.log('results ' + results);
        });
    }

    setOptions(req, res, next)
    {
        res.header('Access-Control-Allow-Methods', 'GET')
        next()
    }

    // set routes
    routes()
    {
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
            next()
        })

        app.get('/waterlevel/:id', [this.setOptions, this.getWaterLevel])

        // 404 page
        app.use((req, res) => { res.sendStatus(404) })
    }

    // get port and start server
    startServer()
    {
        app.set('port', (process.env.PORT || 3000))
        app.listen(app.get('port'), () => { console.log(`Node Server is running on port ${app.get('port')}`) })
    }




    /* ======================================= */
    // STATIONS
    /* ======================================= */

    createStations(amount)
    {
        for (let i = 0; i < amount; i += 1) {
            const station = new Station(i)
            this.stations.push(station)
        }
    }

    initNewStation(uid)
    {
        for (let [i, station] of this.stations.entries()) {
            const sUid = station.uid

            // if uid already exists then stop
            if (uid === sUid)
                break

            // try to insert new station to array
            if ( ! sUid || sUid === null) {
                station.setUid(uid)
                console.log(`new station added with uid: ${station.getUid()} at index: ${i}`)
                break
            }
        }
    }

    convertWaterHeightToPrct(val)
    {
        let prct = 130 - 13 * val / 10

        if (prct > 100) return 100
        if (prct < 0) return 0
        
        return prct
    }

    convertHumidityValToPrct(val)
    {
        let prct = Math.floor(6000 / 23 - (10 * val) / 23)
        if (prct > 100) return 100
        if (prct < 0) return 0

        return prct
    }

    shouldWaterGateOpen = () =>
    {
        for(let station of this.stations)
        {
            if (station.waterLevel === null || station.humidityLevel === null)
                continue

            let waterPrct = this.convertWaterHeightToPrct(station.waterLevel)
            let humidPrct = this.convertHumidityValToPrct(station.humidityLevel)

            if (waterPrct > 80 && humidPrct > 50) {
                if (station.waterGateState === false) {
                    // console.log('Open the gates for tank', station.uid)

                    // TODO: set this at event handler after g1
                    station.setWaterGateState(true)
                    station.setWaterGateOpenedAt(Date.now())

                    // emit to arduino to open gate
                    this.writeToSerialPort('g1')
                } {
                    // console.log(`Gate of tank ${station.uid} is already open`)
                }
            } else {
                if (station.getWaterGateOpenedAt() !== null) {
                    if (station.getWaterGateState() === true) {

                        // we can close gate again after some time
                        if (Date.now() - station.waterGateOpenedAt > station.openTime) {
                            // console.log('Close the gate for tank', station.uid)

                            // TODO: set this at event handler after g0
                            station.setWaterGateState(false)

                            // emit to arduino to open gate
                            this.writeToSerialPort('g0')
                        }
                    } else {
                        // console.log('Gate is already closed for tank', station.uid)
                    }
                } else {
                    // console.log('No need to open gate for tank', station.uid)
                }
            }
        }
    }





    /* ======================================= */
    // @WidgetStore.getWaterLevel
    /* ======================================= */

    getWaterLevel = (req, res, next) =>
    {
        let id = parseInt(req.params.id)
        let waterLevel = this.stations[id].waterLevel

        // console.log(`[${id}]: ${waterLevel}`)
        
        // console.log(`requested water level for T${id} : ${this.stations[id].waterLevel}`)
        res.json(waterLevel)
    }
}

new Server()