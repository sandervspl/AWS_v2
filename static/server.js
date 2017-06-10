/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Applications/XAMPP/xamppfiles/htdocs/jaar_2/AWS_v2/static";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Station = function () {
  function Station(id) {
    var _this = this;

    _classCallCheck(this, Station);

    this.logData = function () {
      if (_this.uid !== null) {
        console.log("[" + _this.uid + "] Water Level: " + _this.waterLevel);
        console.log("[" + _this.uid + "] Humidity Level: " + _this.humidityLevel);
      }
    };

    this.id = id;
    this.uid = null;
    this.waterLevel = null;
    this.humidityLevel = null;
    this.waterGateState = false;
    this.waterGateOpenedAt = null;
    this.openTime = 30 * 1000;
  }

  _createClass(Station, [{
    key: "getUid",
    value: function getUid() {
      return this.uid;
    }
  }, {
    key: "setUid",
    value: function setUid(uid) {
      this.uid = uid;
    }
  }, {
    key: "getWaterLevel",
    value: function getWaterLevel() {
      return this.waterLevel;
    }
  }, {
    key: "setWaterLevel",
    value: function setWaterLevel(lvl) {
      this.waterLevel = lvl;
    }
  }, {
    key: "getHumidityLevel",
    value: function getHumidityLevel() {
      return this.humidityLevel;
    }
  }, {
    key: "setHumidityLevel",
    value: function setHumidityLevel(lvl) {
      this.humidityLevel = lvl;
    }
  }, {
    key: "getWaterGateState",
    value: function getWaterGateState() {
      return this.waterGateState;
    }
  }, {
    key: "setWaterGateState",
    value: function setWaterGateState(state) {
      this.waterGateState = state;
    }
  }, {
    key: "getWaterGateOpenedAt",
    value: function getWaterGateOpenedAt() {
      return this.waterGateOpenedAt;
    }
  }, {
    key: "setWaterGateOpenedAt",
    value: function setWaterGateOpenedAt(time) {
      this.waterGateOpenedAt = time;
    }
  }, {
    key: "getOpenTime",
    value: function getOpenTime() {
      return this.openTime;
    }
  }]);

  return Station;
}();

exports.default = Station;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  host: 'localhost',
  // host: '192.168.1.115',
  port: {
    web: 8080,
    server: 3000,
  },
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("serialport");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Station = __webpack_require__(0);

var _Station2 = _interopRequireDefault(_Station);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// dependencies
var Express = __webpack_require__(3);
var SerialPort = __webpack_require__(4);
var bodyParser = __webpack_require__(2);
var connect = __webpack_require__(1);

// server
var app = new Express();

var Server = function () {
  function Server() {
    var _this = this;

    _classCallCheck(this, Server);

    this.init = function () {
      // block the header from containing information about the server
      app.disable('x-powered-by');

      // body parser —to be able to read body content
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());

      // open serialport
      _this.openSerialport();

      // start watergate check interval
      // setInterval(this.shouldWaterGateOpen, 1000)

      // create some stations
      _this.createStations(10);

      // routes
      _this.routes();

      // start server!
      _this.startServer();
    };

    this.openSerialport = function () {
      _this.serialport = new SerialPort('/dev/cu.usbmodem1421', { parser: SerialPort.parsers.readline('\n') });
      _this.handleSerialPortEvents();
    };

    this.handleSerialPortEvents = function () {
      _this.serialport.on('error', function (err) {
        console.log('Serial Port could not be opened:', err);
      }).on('open', function () {
        console.log('Serial Port Opened');
      }).on('data', function (data) {
        console.log(data);
        // data looks something like this
        // UIDw45

        // grab uid from char [0] to [3]
        var uid = data.slice(0, 3); // grab uid

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this.stations.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                id = _step$value[0],
                station = _step$value[1];

            var length = _this.stations.length - 1;

            if (station.uid !== uid) {
              // if we come this far we might have a new station that should be installed
              if (id === length) {
                _this.initNewStation(uid);
                break;
              }

              continue;
            }

            // value is placed after uid and its data mark (so we cut away 'UIDw' for example)
            var val = data.slice(4, data.length);

            // [3] is the data mark so we can identify what data we are receiving
            if (data[3] === 'w') _this.stations[id].setWaterLevel(val);

            if (data[3] === 'h') _this.stations[id].setHumidityLevel(val);

            if (data[3] === 'g') {
              var _station = _this.getStationWithUid(uid);

              if (_station === null) {
                console.log('no station found');
                return;
              }

              // close gate
              if (data[4] === '0') {
                console.log('Close the gate for tank', _station.uid);
                _station.setWaterGateState(false);
              }

              // open state
              if (data[4] === '1') {
                console.log('Open the gates for tank', _station.uid);
                _station.setWaterGateOpenedAt(Date.now());
                _station.setWaterGateState(true);
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    };

    this.writeToSerialPort = function (str) {
      // Sending String character by character
      for (var i = 0; i < str.length; i += 1) {
        _this.serialport.write(new Buffer(str[i], 'ascii'));
      }

      // Sending the terminate character
      _this.serialport.write(new Buffer('#', 'ascii'));
    };

    this.shouldWaterGateOpen = function () {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _this.stations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var station = _step2.value;

          if (station.waterLevel === null || station.humidityLevel === null) continue;

          var waterPrct = _this.convertWaterHeightToPrct(station.waterLevel);
          var humidPrct = _this.convertHumidityValToPrct(station.humidityLevel);

          if (waterPrct > 80 && humidPrct > 50) {
            if (station.waterGateState === false) {
              // emit to arduino to open gate
              _this.writeToSerialPort('g1');
            } else {
              // console.log(`Gate of tank ${station.uid} is already open`)
            }
          } else {
            if (station.getWaterGateOpenedAt() !== null) {
              if (station.getWaterGateState() === true) {

                // we can close gate again after some time
                if (Date.now() - station.waterGateOpenedAt > station.openTime) {
                  // emit to arduino to open gate
                  _this.writeToSerialPort('g0');
                }
              } else {
                // console.log('Gate is already closed for tank', station.uid)
              }
            } else {
                // console.log('No need to open gate for tank', station.uid)
              }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    };

    this.getOptions = function (req, res, next) {
      return res.json(res.get('Access-Control-Allow-Methods'));
    };

    this.setStationGateState = function (req, res) {
      if (typeof req.body.tankId === 'undefined' || req.body.tankId === null || typeof req.body.state === 'undefined' || req.body.state === null) {
        console.log(req.body);
        throw new Error('Expected object with tankId and/or state');
      }

      var id = req.body.tankId;
      var state = req.body.state;

      // console.log('opening gate for tank ', id)

      // write state to arduino
      var str = state ? 'g1' : 'g0';
      _this.writeToSerialPort(str);

      // save state to station
      _this.stations[id].setWaterGateState(state);

      // return state
      res.json(state);
    };

    this.setBigButton = function (req, res) {
      var state = req.body.state;
      _this.allTanksActive = state;

      res.json(state);
    };

    this.getBigButton = function (req, res, next) {
      return res.json(_this.allTanksActive);
    };

    this.getWaterLevel = function (req, res) {
      var id = parseInt(req.params.id);
      var waterLevel = _this.stations[id].waterLevel;

      res.json(waterLevel);
    };

    this.getStationGateState = function (req, res) {
      var id = parseInt(req.params.id);
      var gateState = _this.stations[id].getWaterGateState();

      res.json(gateState);
    };

    this.stations = [];
    this.serialport = null;
    this.allTanksActive = 0;

    this.init();
    this.routes();

    console.log('Server started!');
  }

  /* ======================================= */
  // SERVER INITIALIZATION
  /* ======================================= */

  // initialize express server


  _createClass(Server, [{
    key: 'routes',


    // set routes
    value: function routes() {
      app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
      });

      app.use(function (req, res, next) {
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
      app.use(function (req, res) {
        return res.sendStatus(404);
      });
    }

    // get port and start server

  }, {
    key: 'startServer',
    value: function startServer() {
      app.set('port', process.env.PORT || connect.port.server || 3000);
      app.listen(app.get('port'), function () {
        return console.log('Node Server is running on port ' + app.get('port'));
      });
    }

    /* ======================================= */
    // STATIONS
    /* ======================================= */

  }, {
    key: 'createStations',
    value: function createStations(amount) {
      for (var i = 0; i < amount; i += 1) {
        var station = new _Station2.default(i);
        this.stations.push(station);
      }
    }
  }, {
    key: 'initNewStation',
    value: function initNewStation(uid) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.stations.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              i = _step3$value[0],
              station = _step3$value[1];

          var sUid = station.uid;

          // if uid already exists then stop
          if (uid === sUid) break;

          // try to insert new station to array
          if (!sUid || sUid === null) {
            station.setUid(uid);
            console.log('new station added with uid: ' + station.getUid() + ' at index: ' + i);
            break;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: 'getStationWithUid',
    value: function getStationWithUid(uid) {
      var station = null;

      this.stations.forEach(function (s) {
        if (s.uid === uid) station = s;
      });

      return station;
    }
  }, {
    key: 'convertWaterHeightToPrct',
    value: function convertWaterHeightToPrct(val) {
      var prct = 130 - 13 * val / 10;

      if (prct > 100) return 100;
      if (prct < 0) return 0;

      return prct;
    }
  }, {
    key: 'convertHumidityValToPrct',
    value: function convertHumidityValToPrct(val) {
      var prct = Math.floor(6000 / 23 - 10 * val / 23);
      if (prct > 100) return 100;
      if (prct < 0) return 0;

      return prct;
    }

    /* ======================================= */
    // @WidgetStore.setStationGateState
    /* ======================================= */

    /* ======================================= */
    // @WidgetStore.getWaterLevel
    /* ======================================= */

    /* ======================================= */
    // @WidgetStore.getStationGateState
    /* ======================================= */

  }]);

  return Server;
}();

new Server();

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map