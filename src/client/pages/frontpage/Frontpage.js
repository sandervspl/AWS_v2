// dependencies
import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Login from './components/Login/Login';
import Grid from './components/pages/Grid';
import Menu from './components/pages/Menu';
import Notification from '../layout/Notification';
import Navbar from './components/Navbar';

// stores
import notificationStore from '../../stores/NotificationStore';
import navbarStore from '../../stores/NavbarStore';

// actions
import * as locationActions from 'ducks/modules/location';
import * as weatherActions from 'ducks/modules/weather';

@Radium
class Frontpage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: notificationStore.getAll(),
      activeView: 'menu',
    };
  }

  componentWillMount() {
    notificationStore.addListener('change', this.getAllNotifications);
  }

  componentDidMount() {
    this.props.locationActions.fetchLocationData();
  }

  componentWillUnmount() {
    notificationStore.removeListener('change', this.getAllNotifications);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.location.loaded && nextProps.location.loaded) {
      // we have received location data
      // try to get weather data
      this.props.weatherActions.fetchWeatherData();
    }
  }

  getAllNotifications = () => {
    this.setState({
      notifications: notificationStore.getAll(),
    });
  };

  setActiveView = activeView => {
    this.setState({ activeView });
  };

  render() {
    let menuX = null;
    let gridX = null;

    if (this.state.activeView === 'menu') {
      menuX = { transform: 'translateX(0)' };
      gridX = { transform: 'translateX(100%)' };
    } else {
      menuX = { transform: 'translateX(-100%)' };
      gridX = { transform: 'translateX(-100%)' };
    }

    const notifications = this.state.notifications.map(notification =>
      <Notification key={notification.id} {...notification} />
    );

    return (
      <div id="view-wrapper" style={styles.base}>
        <Navbar
          title={this.state.activeView}
          setActiveView={this.setActiveView}
        />

        {notifications}

        {/*<Login/>*/}

        <div id="menu-wrapper" style={[styles.view, menuX]}>
          <Menu setActiveView={this.setActiveView} />
        </div>

        <div id="grid-wrapper" style={[styles.view, styles.grid, gridX]}>
          <Grid />
        </div>
      </div>
    );
  }
}

const styles = {
  base: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    background:
      'linear-gradient(-45deg, rgb(44, 53, 58) 0%, rgb(55, 67, 74) 36%, rgb(40, 52, 59) 100%)',
  },

  view: {
    display: 'inline-block',
    height: '100%',
    width: '100%',
    transition: 'transform 0.5s ease-in-out',
    verticalAlign: 'top',
  },
};

function mapStateToProps(state) {
  return {
    location: state.location,
    weather: state.weather,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    locationActions: bindActionCreators(locationActions, dispatch),
    weatherActions: bindActionCreators(weatherActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage);
