// dependencies
import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
const axios = require('axios');

// vars
import * as vars from '../../secret/vars';
import * as connect from '../../secret/connect';


class MenuStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.bigButtonState = false;
  }

  fetch() {
    this.emit('fetching');
  }

  fail() {
    this.emit('fail');
  }

  getBigButtonState = () => this.bigButtonState;

  fetchBigButtonState = () => {
    axios.get(`http://${connect.host}:${connect.port.server}/getbigbutton`)
        .then(response => {
          this.bigButtonState = parseInt(response.data);
          this.emit('bigbutton_state_change');
        })
        .catch(err => {
          console.warn('could not fetch big button state on server: ' + err);
          this.emit('fail');
        });
  };

  setBigButtonState = (state) => {
    const endpoint = `http://${connect.host}:${connect.port.server}/setbigbutton`;
    const options = { state };

    axios.post(endpoint, options)
        .then(response => {
          this.bigButtonState = parseInt(response.data);
          this.emit('bigbutton_state_change');
        })
        .catch(err => {
          console.warn('could not set big button state on server: ' + err);
          this.emit('fail');
        });
  };

  handleActions = (action) => {
    switch (action.type) {
      case 'FETCH': {
        this.fetch();
        break;
      }

      case 'SET_BIGBUTTON_STATE': {
        this.setBigButtonState(action.state);
        break;
      }

      case 'FETCH_BIGBUTTON_STATE': {
        this.fetchBigButtonState();
        break;
      }
    }
  };
}

const menuStore = new MenuStore;

// dispatcher
Dispatcher.register(menuStore.handleActions);

export default menuStore;