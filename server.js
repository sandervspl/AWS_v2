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
        this.data = []
        this.openTime = 30000

        this.init()
        this.routes()
    }

    // initialize express server
    init()
    {
        // block the header from containing information about the server
        app.disable('x-powered-by')

        // body parser —to be able to read body content
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        
        // open serialport
        this.openSerialport()

        // start watergate check interval
        setInterval(this.shouldWaterGateOpen.bind(this), 1000)

        // fill data with default stuff
        this.fillData()

        // routes
        this.routes()
        this.startServer()
    }

    fillData()
    {
        for (let i = 0; i < 10; i += 1) {
            this.data.push({
                humidityLevel: null,
                waterLevel: null,
                waterGateState: false,
                waterGateOpenedAt: null
            })
        }
    }

    openSerialport()
    {
        // serialport
        let serialport = new SerialPort('/dev/cu.usbmodem1411', { parser: SerialPort.parsers.readline('\n') })

        serialport
            .on('error', err => { console.log('Serial Port could not be opened:', err) })
            .on('open', () => { console.log('Serial Port Opened') })
            .on('data', data =>
            {
                // TODO: receive id data from arduino
                const id = 1

                // cut away first character from string
                let val = data.slice(1, data.length)

                if (data[0] === 'w')
                    this.data[id].waterLevel = val

                if (data[0] === 'h')
                    this.data[id].humidityLevel = val
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
        app.listen(app.get('port'), () => { console.log('Node Server is running on port', app.get('port')) })
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

    getWaterLevel(req, res, next)
    {
        let id = parseInt(req.params.id)

        res.json(this.data[id].waterLevel)
        // console.log(this.waterLevels[id])
    }

    shouldWaterGateOpen()
    {
        for(let [i, data] of this.data.entries())
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
}

new Server()