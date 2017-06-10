// dependencies
const React = require('react');
const Radium = require('radium');

const bucketImg = require('assets/img/bucket_icon_white.png');

// actions
import { createNotification } from '../../../actions/NotificationActions';
import { setBigButtonState, fetchBigButtonState } from '../../../actions/MenuActions';
import { setAllGateStates } from '../../../actions/WidgetActions';

// stores
import menuStore from '../../../stores/MenuStore';


@Radium
export default class BigButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  componentWillMount() {
    // if server completed our request we handle it
    menuStore.on('bigbutton_state_change', () => {
      const active = menuStore.getBigButtonState();
      this.setState({ active });
      // console.log('bigbutton state is changed to', active)
      setTimeout(this.sendNotification, 100);
    });

    // get state from server
    fetchBigButtonState();
  }

  // send new state for gates to server
  toggleActiveState = () => {
    const state = this.state.active ? 0 : 1;
    setAllGateStates(state);
    setBigButtonState(state);
  };

  sendNotification = () => {
    const expiresTime = Date.now() + 5000;

    if (this.state.active) {
      const kind = 'success';
      const msg = 'Alle watertanks worden geleegd.';
      createNotification(kind, msg, expiresTime);
    } else {
      const kind = 'alert';
      const msg = 'Watertanks zijn gestopt met legen.';
      createNotification(kind, msg, expiresTime);
    }
  };

  render() {
    let stateMsg = 'UIT',
        bucketStyle = styles.img,
        buttonStyle = styles.off,
        textStyle = styles.stateText.off;

    if (this.state.active) {
      stateMsg = 'AAN';
      bucketStyle = [styles.img, styles.rotate];
      buttonStyle = styles.on;
      textStyle = styles.stateText.on;
    }

    return (
        <div style={styles.base}>
          <div style={styles.btn} onClick={this.toggleActiveState}>
            <div style={ [styles.midCircle, buttonStyle] } className="midCircle">
              <img src={bucketImg} alt="Bucket" style={bucketStyle} />
            </div>
          </div>
          <div style={styles.description}>
            <p style={styles.systemText}>Drainage Systeem</p>
            <p style={ [styles.stateText, textStyle] }>{stateMsg}</p>
          </div>
        </div>
    );
  }
}


const styles = {
  base: {
    textAlign: 'center',
  },

  btn: {
    position: 'relative',
    margin: '50px auto 0',
    width: '100px',
    height: '100px',
    background: '#eee',
    borderRadius: '50%',

    ':hover': {
      cursor: 'pointer',
    },

    ':active > .midCircle': {
      transform: 'scale(0.9)',
    },
  },

  midCircle: {
    position: 'relative',
    top: 'calc(50% - 30px)',
    width: '60px',
    height: '60px',
    margin: 'auto',
    borderRadius: '50%',
    transition: 'box-shadow .3s ease-out',
  },

  img: {
    position: 'relative',
    width: '27px',
    top: 'calc(50% - 13.5px)',
    transition: 'transform .3s ease-in-out, background .3s ease-in-out',
  },

  rotate: {
    transform: 'rotateZ(-135deg)',
  },

  description: {
    marginTop: '15px',
  },

  on: {
    background: '#5FE182',
    boxShadow: 'rgba(95, 225, 130, 0.33) 0px 0px 25px 23px',
  },

  off: {
    background: '#FF6262',
    boxShadow: '0 0 0 0 rgba(0,0,0,0)',
  },

  stateText: {
    fontSize: '2em',
    fontWeight: 900,
    letterSpacing: '3px',
    lineHeight: '1em',

    on: {
      color: '#5FE182',
    },

    off: {
      color: '#FF6262',
    },
  },

  systemText: {
    textTransform: 'uppercase',
  },
};