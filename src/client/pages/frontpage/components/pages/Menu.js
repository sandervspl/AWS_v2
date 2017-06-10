// dependencies
import React from 'react';
import Radium from 'radium';

// components
import BigButton from '../BigButton';
import Logo from '../Logo';
import WidgetMenu from '../WidgetMenu';
import WidgetWindow from '../WidgetWindow';

// stores
import menuStore from '../../../../stores/MenuStore';

// actions
import * as menuActions from '../../../../actions/MenuActions';

@Radium
export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewName: 'menu',
    };
  }

  componentWillMount() {
    // fetch new weather data every minute
    // setInterval(() => {
    //   this.getWeatherDataFromPosition(this.state.pos);
    // }, 60000);
  }

  // handleDispatches = () => {
  //   menuStore.on('fetching', () => this.startRefreshSpinner());
  //
  //   menuStore.on('fail', () => this.stopRefreshSpinner());
  //
  //   menuStore.on('change_position_data', () => {
  //     this.setState({ pos: menuStore.getPosition() });
  //     this.getWeatherDataFromPosition(this.state.pos);
  //   });
  //
  //   menuStore.on('change_weather_data', () => {
  //     this.setState({ weatherData: menuStore.getWeatherData() });
  //     this.stopRefreshSpinner();
  //   });
  // };

  // start refreshing state
  // startRefreshSpinner = () => this.setState({ refreshingWeather: true });

  // stop refreshing state
  // stopRefreshSpinner = () => this.setState({ refreshingWeather: false });

  // fetch weather data from OpenWeather API
  // with Langitude and Longitude
  // getWeatherDataFromPosition = (pos) => {
  //   const crd = pos.coords;
  //
  //   if (typeof crd === 'undefined')
  //     return;
  //
  //   this.startRefreshSpinner();
  //   menuActions.getWeatherData(crd.latitude, crd.longitude);
  // };

  render() {
    return (
        <div style={styles.base}>
          <Logo />

          <WidgetMenu />

          <BigButton />

          <WidgetWindow />
        </div>
    );
  }
}


const styles = {
  base: {
    padding: '70px 0 0',
    height: '100%',
    width: '100%',
  },
};