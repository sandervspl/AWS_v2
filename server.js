// dependencies
const Express = require('express');
const SerialPort = require('serialport');
const bodyParser = require('body-parser');
const connect = require('./src/js/secret/connect');

import Station from './Station';

// server
const app = new Express();

class Server {
  constructor() {
    this.stations = [];
    this.serialport = null;
    this.allTanksActive = 0;

    this.init();
    this.routes();
  }


  /* ======================================= */
  // SERVER INITIALIZATION
  /* ======================================= */

  // initialize express server
  init = () => {
    // block the header from containing information about the server
    app.disable('x-powered-by');

    // body parser —to be able to read body content
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // open serialport
    this.openSerialport();

    // start watergate check interval
    // setInterval(this.shouldWaterGateOpen, 1000)

    // create some stations
    this.createStations(10);

    // routes
    this.routes();

    // start server!
    this.startServer();
  };

  openSerialport = () => {
    this.serialport = new SerialPort('/dev/cu.usbmodem1421', { parser: SerialPort.parsers.readline('\n') });
    this.handleSerialPortEvents();
  };

  handleSerialPortEvents = () => {
    this.serialport
        .on('error', err => {
          console.log('Serial Port could not be opened:', err);
        })
        .on('open', () => {
          console.log('Serial Port Opened');
        })
        .on('data', data => {
          console.log(data);
          // data looks something like this
          // UIDw45

          // grab uid from char [0] to [3]
          const uid = data.slice(0, 3); // grab uid

          for (let [id, station] of this.stations.entries()) {
            const length = this.stations.length - 1;

            if (station.uid !== uid) {
              // if we come this far we might have a new station that should be installed
              if (id === length) {
                this.initNewStation(uid);
                break;
              }

              continue;
            }

            // value is placed after uid and its data mark (so we cut away 'UIDw' for example)
            const val = data.slice(4, data.length);

            // [3] is the data mark so we can identify what data we are receiving
            if (data[3] === 'w')
              this.stations[id].setWaterLevel(val);

            if (data[3] === 'h')
              this.stations[id].setHumidityLevel(val);

            if (data[3] === 'g') {
              let station = this.getStationWithUid(uid);

              if (station === null) {
                console.log('no station found');
                return;
              }

              // close gate
              if (data[4] === '0') {
                console.log('Close the gate for tank', station.uid);
                station.setWaterGateState(false);
              }

              // open state
              if (data[4] === '1') {
                console.log('Open the gates for tank', station.uid);
                station.setWaterGateOpenedAt(Date.now());
                station.setWaterGateState(true);
              }
            }
          }
        });
  };

  writeToSerialPort = (str) => {
    // Sending String character by character
    for (let i = 0; i < str.length; i += 1) {
      this.serialport.write(new Buffer(str[i], 'ascii'));
    }

    // Sending the terminate character
    this.serialport.write(new Buffer('#', 'ascii'));
  };

  // set routes
  routes() {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      next();
    });

    app.options('*', this.getOptions);

    app.get('/waterlevel/:id', this.getWaterLevel);
    app.get('/gatestate/:id', this.getStationGateState);
    app.get('/getbigbutton', this.getBigButton);

    app.post('/setgate', this.setStationGateState);
    app.post('/setbigbutton', this.setBigButton);

    // 404 page
    app.use((req, res) => res.sendStatus(404));
  }

  // get port and start server
  startServer() {
    app.set('port', (process.env.PORT || connect.port.server || 3000));
    app.listen(app.get('port'), () => console.log(`Node Server is running on port ${app.get('port')}`));
  }


  /* ======================================= */
  // STATIONS
  /* ======================================= */

  createStations(amount) {
    for (let i = 0; i < amount; i += 1) {
      const station = new Station(i);
      this.stations.push(station);
    }
  }

  initNewStation(uid) {
    for (let [i, station] of this.stations.entries()) {
      const sUid = station.uid;

      // if uid already exists then stop
      if (uid === sUid)
        break;

      // try to insert new station to array
      if (!sUid || sUid === null) {
        station.setUid(uid);
        console.log(`new station added with uid: ${station.getUid()} at index: ${i}`);
        break;
      }
    }
  }

  getStationWithUid(uid) {
    let station = null;

    this.stations.forEach((s) => {
      if (s.uid === uid)
        station = s;
    });

    return station;
  }

  convertWaterHeightToPrct(val) {
    let prct = 130 - 13 * val / 10;

    if (prct > 100) return 100;
    if (prct < 0) return 0;

    return prct;
  }

  convertHumidityValToPrct(val) {
    let prct = Math.floor(6000 / 23 - (10 * val) / 23);
    if (prct > 100) return 100;
    if (prct < 0) return 0;

    return prct;
  }

  shouldWaterGateOpen = () => {
    for (let station of this.stations) {
      if (station.waterLevel === null || station.humidityLevel === null)
        continue;

      let waterPrct = this.convertWaterHeightToPrct(station.waterLevel);
      let humidPrct = this.convertHumidityValToPrct(station.humidityLevel);

      if (waterPrct > 80 && humidPrct > 50) {
        if (station.waterGateState === false) {
          // emit to arduino to open gate
          this.writeToSerialPort('g1');
        } else {
          // console.log(`Gate of tank ${station.uid} is already open`)
        }
      } else {
        if (station.getWaterGateOpenedAt() !== null) {
          if (station.getWaterGateState() === true) {

            // we can close gate again after some time
            if (Date.now() - station.waterGateOpenedAt > station.openTime) {
              // emit to arduino to open gate
              this.writeToSerialPort('g0');
            }
          } else {
            // console.log('Gate is already closed for tank', station.uid)
          }
        } else {
          // console.log('No need to open gate for tank', station.uid)
        }
      }
    }
  };


  getOptions = (req, res, next) => res.json(res.get('Access-Control-Allow-Methods'));

  /* ======================================= */
  // @WidgetStore.setStationGateState
  /* ======================================= */

  setStationGateState = (req, res) => {
    if (typeof req.body.tankId === 'undefined' || req.body.tankId === null ||
        typeof req.body.state === 'undefined' || req.body.state === null) {
      console.log(req.body);
      throw new Error('Expected object with tankId and/or state');
    }

    const id = req.body.tankId;
    const state = req.body.state;

    // console.log('opening gate for tank ', id)

    // write state to arduino
    let str = state ? 'g1' : 'g0';
    this.writeToSerialPort(str);

    // save state to station
    this.stations[id].setWaterGateState(state);

    // return state
    res.json(state);
  };

  setBigButton = (req, res) => {
    const state = req.body.state;
    this.allTanksActive = state;

    res.json(state);
  };

  getBigButton = (req, res, next) => res.json(this.allTanksActive);


  /* ======================================= */
  // @WidgetStore.getWaterLevel
  /* ======================================= */

  getWaterLevel = (req, res) => {
    const id = parseInt(req.params.id);
    const waterLevel = this.stations[id].waterLevel;

    res.json(waterLevel);
  };


  /* ======================================= */
  // @WidgetStore.getStationGateState
  /* ======================================= */

  getStationGateState = (req, res) => {
    const id = parseInt(req.params.id);
    const gateState = this.stations[id].getWaterGateState();

    res.json(gateState);
  };
}

new Server();