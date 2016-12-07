// dependencies
const http = require('http')
const Express = require('express')
const SerialPort = require('serialport')

// server
const app = new Express()


class Server {
    constructor()
    {
        this.humid = null
        this.humidSensorConnected = false

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
        let totalVal = ''

        // serialport
        const serialport = new SerialPort('/dev/cu.usbmodem1411')
        serialport.on('error', (err) => {
            console.log('Serial Port could not be opened:', err)
            this.humidSensorConnected = false
        })
        serialport.on('open', () => {
            console.log('Serial Port Opened')
            this.humidSensorConnected = true
        })


        // when serialport receives data
        serialport.on('data', (data) => {

            // nothing connected to retrieve data from
            if ( ! this.humidSensorConnected) {
                this.humid = -1
                return
            }

            const val = parseInt(data.toString().trim(), 10)

            if(val === '' || val === ' ' || isNaN(val))
                return

            // console.log('received val:', val)

            /*
                Most of the time, arduino will send out incomplete data to the serial
                This means values will be broken up into multiple values
                We have to add these values to get the real value
             */
            let actualVal = val

            /*
                We use values of >= 370 and <= 600 (3 digits)
                so it's fair to say the incomplete numbers will contain 1 or 2 digits
             */
            if (val < 100) {
                // add our data as a string to our total
                totalVal += `${val}`

                // if it's (still) below 100, we will not use this data (yet)
                actualVal = parseInt(totalVal)
                if (actualVal < 100) {
                    // console.log('error 1:', actualVal)
                    return
                }
            }

            // do not use these values
            if (actualVal < 200 || actualVal > 1023) {
                // console.log('error 2:', actualVal)

                if (actualVal > 1023)
                    totalVal = ''

                return
            }

            // when the code arrives here, we have succesfully received or recreated our data value
            // console.log('usable value:', actualVal)

            totalVal = ''
            this.humid = actualVal
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

        app.get('/', [this.setOptions, this.getHumidity.bind(this)])

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
        res.json(this.humid)
    }
}

new Server()