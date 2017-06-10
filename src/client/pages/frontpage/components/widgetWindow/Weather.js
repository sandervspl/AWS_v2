// dependencies
import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// component
import WeatherItem from './Weather/WeatherItem';

// actions
import locationActions from 'ducks/modules/location';

@Radium
class Weather extends React.Component {
  handleClick = () => this.props.locationActions.getLocationData();

  render() {
    const { loading: locationLoading } = this.props.location;
    const { weatherData, loading: weatherLoading } = this.props.weather;
    const { name, wind } = weatherData;
    const { humidity, temp } = weatherData.main;
    const { id } = weatherData.weather[0];

    const loadStyle = (locationLoading || weatherLoading) ? 'loading' : 'loading loaded';

    return (
        <div style={styles.base}>
          <div className={loadStyle} />

          <div style={styles.titleContainer}>
            <h3 style={styles.location} className="location"> {name} </h3>
            <span className="location-refresh" onClick={this.handleClick} />
          </div>

          <div style={styles.row}>
            <WeatherItem kind="humidity" humidity={humidity} />
            <WeatherItem kind="temperature" temp={temp} id={id} />
            <WeatherItem kind="wind" wind={wind} />
          </div>
        </div>
    );
  }
}


const styles = {
  base: {
    width: '100%',
    height: '100%',
    padding: '10px 0',
    boxSizing: 'border-box',
  },

  location: {
    display: 'inline-block',
    fontSize: '18px',
    fontWeight: '400',
    verticalAlign: 'bottom',
    marginRight: '10px',
  },

  row: {
    display: 'flex',
    flexFlow: 'row',
    marginTop: '20px',
    height: '100px',
    boxSizing: 'border-box',
  },

  titleContainer: {
    textAlign: 'center',
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
