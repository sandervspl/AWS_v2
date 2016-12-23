// dependencies
const Express = require('express')
const SerialPort = require('serialport')

// server
const app = new Express()


class Server {
    constructor()
    {
        this.humidity = null
        this.waterLevel = null

        this.init()
        this.routes()
    }

    // initialize express server
    init()
    {
        // block the header from containing information about the server
        app.disable('x-powered-by')
        
        // open serialport
        this.openSerialport()

        // routes
        this.routes()
        this.startServer()
    }

    openSerialport()
    {
        // serialport
        const serialport = new SerialPort('/dev/cu.usbmodem1411', { parser: SerialPort.parsers.readline('\n') })

        serialport
            .on('error', (err) => { console.log('Serial Port could not be opened:', err) })
            .on('open', () => { console.log('Serial Port Opened') })
            .on('data', (data) =>
            {
                // cut away first character from string
                let val = data.slice(1, data.length)

                if (data[0] === 'w')
                    this.waterLevel = val

                if (data[0] === 'h') {
                    // We use values of >= 370 and <= 600

                    this.humidity = val
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

        app.get('/humidity', [this.setOptions, this.getHumidity.bind(this)])
        app.get('/waterlevel', [this.setOptions, this.getWaterLevel.bind(this)])

        // 404 page
        app.use((req, res) => { res.sendStatus(404) })
    }

    // get port and start server
    startServer()
    {
        app.set('port', (process.env.PORT || 3000))
        app.listen(app.get('port'), () => {
            console.log('Node Server is running on port', app.get('port'))
        })
    }

    getHumidity(req, res, next)
    {
        res.json(this.humidity)
    }

    getWaterLevel(req, res, next)
    {
        res.json(this.waterLevel)
    }
}

new Server()