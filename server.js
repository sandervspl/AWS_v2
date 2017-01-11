// dependencies
const Express = require('express')
const SerialPort = require('serialport')
const bodyParser = require('body-parser')

// server
const app = new Express()


class Server
{
    constructor()
    {
        this.stations = []
        this.openTime = 30000

        // TODO: add support for multiple serialports
        // this.serialPorts = []

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
        setInterval(this.shouldWaterGateOpen.bind(this), 1000)

        // fill data with default stuff
        // console.log('setting points data...')
        this.fillPointsData()

        // routes
        // console.log('setting routes...')
        this.routes()

        // start server!
        // console.log('starting server...')
        this.startServer()
    }

    openSerialport()
    {
        // serialport
        let serialport = new SerialPort('/dev/cu.usbmodem1411', { parser: SerialPort.parsers.readline('\n') })

        // SerialPort.list((err, ports) => {
        //     ports.forEach(port => {
        //         console.log(port.comName)
        //     })
        // })

        serialport
            .on('error', err => { console.log('Serial Port could not be opened:', err) })
            .on('open', () => { console.log('Serial Port Opened') })
            .on('data', data => {
                // data looks something like this
                // #UIDw45

                // grab uid from char [0] to [3]
                const uid = data.slice(0, 3) // grab uid

                for (let [id, point] of this.stations.entries())
                {
                    // we don't use index 0
                    if (id === 0) continue

                    const length = this.stations.length - 1

                    if (point.uid !== uid) {
                        // if we come this far we might have a new point that should be installed
                        if (id === length) {
                            this.initNewPoint(uid)
                            break
                        }

                        continue
                    }

                    // value is placed after uid and its data mark (so we cut away 'UIDw' for example)
                    const val = data.slice(4, data.length)

                    // [3] is the data mark so we can identify what data we are receiving
                    if (data[3] === 'w')
                            this.stations[id].waterLevel = val

                    if (data[3] === 'h')
                        this.stations[id].humidityLevel = val
                }
            })
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

        app.get('/waterlevel/:id', [this.setOptions, this.getWaterLevel.bind(this)])

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

    fillPointsData()
    {
        for (let i = 0; i < 10; i += 1) {
            this.stations.push({
                uid: null,
                humidityLevel: null,
                waterLevel: null,
                waterGateState: false,
                waterGateOpenedAt: null
            })
        }
    }

    initNewPoint(uid)
    {
        for (let [i, point] of this.stations.entries()) {
            // we don't use index 0
            if (i === 0) continue

            // if uid already exists then stop
            if (uid === point.uid)
                break

            // try to insert new point to array
            if ( ! point.uid || point.uid === null) {
                point.uid = uid
                console.log(`new point added with uid: ${point.uid} at index: ${i}`)
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

    shouldWaterGateOpen()
    {
        for(let [i, data] of this.stations.entries())
        {
            if (i === 0 || data.waterLevel === null)
                continue

            let waterPrct = this.convertWaterHeightToPrct(data.waterLevel)
            let humidPrct = this.convertHumidityValToPrct(data.humidityLevel)

            if (waterPrct > 80 && humidPrct > 50) {
                if (data.waterGateState === false) {
                    // console.log('Open the gates for tank', i)
                    data.waterGateState = true
                    data.waterGateOpenedAt = Date.now()
                } {
                    // console.log(`Gate of tank ${i} is already open`)
                }
            } else {
                if (data.waterGateOpenedAt !== null) {
                    if (data.waterGateState === true) {
                        // we can close gate again after some time
                        if (Date.now() - data.waterGateOpenedAt > this.openTime) {
                            // console.log('Close the gate for tank', i)
                            data.waterGateState = false
                        }
                    } else {
                        // console.log('Gate is already closed for tank', i)
                    }
                } else {
                    // console.log('No need to open gate for tank', i)
                }
            }
        }
    }





    /* ======================================= */
    // @WidgetStore.getWaterLevel
    /* ======================================= */

    getWaterLevel(req, res, next)
    {
        let id = parseInt(req.params.id)

        // console.log(`requested water level for T${id} : ${this.stations[id].waterLevel}`)
        res.json(this.stations[id].waterLevel)
    }
}

new Server()