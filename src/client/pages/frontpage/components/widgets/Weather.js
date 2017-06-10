// dependencies
import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

// components
import Icon from './Weather/Icon';

@Radium
class Weather extends React.Component {
  render() {
    const { weatherData, loading: weatherLoading } = this.props.weather;
    const { loading: locationLoading } = this.props.location;
    const { id } = weatherData.weather[0];
    const { temp } = weatherData.main;

    const loadStyle = weatherLoading || locationLoading ? 'loading' : 'loading loaded';
    const tempBgStyle = temp >= 20 ? styles.hot : styles.cold;

    return (
        <div style={ [styles.base, tempBgStyle] }>
          <div className={loadStyle} style={styles.customLoader} />
          <Icon weatherId={id} />
          <div style={styles.temp}> {(temp).toFixed(0)}º </div>
        </div>
    );
  }
};

const styles = {
  base: {
    position: 'relative',
  },

  hot: {
    background: 'radial-gradient(rgba(255, 255, 135, 0.75), rgba(255, 157, 24, 0.75))',
  },

  cold: {
    background: 'radial-gradient(rgba(121, 152, 249, 0.5), rgba(135, 247, 255, 0.5))',
  },

  temp: {
    color: '#000000',
    fontSize: '1.15em',
    textShadow: '2px 1px 6px rgba(0,0,0,0.5)',
  },
};

function mapStateToProps(state) {
  return {
    location: state.location,
    weather: state.weather,
  };
}

export default connect(mapStateToProps)(Weather);
