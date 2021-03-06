// dependencies
const React = require('react');
const Radium = require('radium');
const axios = require('axios');

// actions
import * as notificationActions from '../../../../../actions/NotificationActions';
import * as widgetActions from '../../../../../actions/WidgetActions';

// stores
import widgetStore from '../../../../../stores/WidgetStore';

@Radium
export default class Watertank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.tankId,
      active: false,
      capacity: 9,
      fillPrct: 0,
    };
    this.interval = null;
  }

  componentDidMount() {
    widgetStore.addListener('water_change', this.onWaterChange);
    widgetStore.addListener('gate_change', this.onGateChange);
    widgetStore.addListener('gate_change_all', this.onAllGateChange);

    // fetch water level every second
    this.interval = setInterval(() => {
      widgetActions.getWaterLevel(this.state.id);
    }, 1000);

    // set water level after giving arduino some fetching time
    setTimeout(() => {
      this.setState({
        fillPrct: widgetStore.getWaterHeight(this.state.id),
      });
    }, 1500);

    widgetActions.getStationGateState(this.state.id);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;

    widgetStore.removeListener('water_change', this.onWaterChange);
    widgetStore.removeListener('gate_change', this.onGateChange);
    widgetStore.removeListener('gate_change_all', this.onAllGateChange);
  }

  onWaterChange = () => {
    const waterHeight = widgetStore.getWaterHeight(this.state.id);

    this.setState({
      fillPrct: waterHeight,
    });
  };

  onGateChange = () => {
    const active = widgetStore.getGateState(this.state.id);

    if (active !== this.state.active) {
      this.setActiveState(active);
    }
  };

  onAllGateChange = () => {
    const active = widgetStore.getGateState(this.state.id);
    this.setActiveState(active, false);
  };

  toggleActiveState = () =>
    widgetActions.setStationGateState(this.state.id, !this.state.active);

  setActiveState = (active, doNotif = true) => {
    this.setState({ active });
    if (doNotif) this.notification(active);
  };

  notification = state => {
    const expiresTime = Date.now() + 3000;

    if (state) {
      const msg = `(Watertank ${this.state.id + 1}) wordt geleegd.`;
      notificationActions.createNotification('success', msg, expiresTime);
    } else {
      const msg = `(Watertank ${this.state.id + 1}) is gestopt met legen.`;
      notificationActions.createNotification('alert', msg, expiresTime);
    }
  };

  render() {
    let fillPrct = this.state.fillPrct;
    let capacity = this.state.capacity;
    let current = 0;
    let fillWidth = 0;

    let warningStyle = null;
    let warningMsg = '';

    if (Number.isFinite(fillPrct)) {
      current = Math.ceil(fillPrct / 100 * capacity);
      fillWidth = { width: `${fillPrct}%` };

      if (fillPrct >= 80) {
        warningStyle = styles.warning;
        warningMsg = 'Bijna vol!';
      }

      if (fillPrct >= 95) {
        warningMsg = 'Tank zit vol!';
      }
    }

    let activeStyle = this.state.active ? styles.on : '';
    let title = 'Tank ' + (this.state.id + 1);

    return (
      <div
        style={[styles.base, this.props.marginStyle, activeStyle]}
        onClick={this.toggleActiveState}
      >
        <div style={styles.title}> {title} </div>

        <div style={warningStyle}> {warningMsg} </div>

        <div style={styles.data}>
          <div style={styles.prct}> {fillPrct}%</div>
          <div style={styles.curCap}> {current}L / {capacity}L</div>
        </div>

        <div style={styles.fillBg}>
          <div style={[styles.fill, fillWidth]} />
        </div>
      </div>
    );
  }
}

const styles = {
  base: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '60px',
    width: '80px',
    height: '90px',
    verticalAlign: 'top',
    background: '#E49B51',
    textAlign: 'center',
    boxShadow: '0 2px 1px 0 rgba(0,0,0,0.5)',
    cursor: 'pointer',
  },

  on: {
    background: '#7AD98A',
  },

  title: {
    position: 'absolute',
    top: '-21px',
    left: 0,
    right: 0,
    fontSize: '12px',
  },

  warning: {
    position: 'absolute',
    width: '100%',
    height: '15px',
    background: '#DA4747',
    textAlign: 'center',
    fontSize: '9px',
    lineHeight: '15px',
  },

  data: {
    position: 'relative',
    top: 'calc(50% - 27.5px)',
  },

  prct: {
    fontSize: '1.5em',
    fontWeight: '500',
    textShadow: 'rgba(0, 0, 0, 0.498039) 2px 1px 6px',
  },

  curCap: {
    fontSize: '.7em',
    fontWeight: '300',
    textShadow: 'rgba(0, 0, 0, 0.498039) 2px 1px 6px',
  },

  fillBg: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '10px',
    background: '#d9f5ff',
  },

  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    background: '#2689BA',
    height: '100%',
    maxWidth: '100%',
    minWidth: '3%',
    transition: 'width .3s ease',
  },
};
