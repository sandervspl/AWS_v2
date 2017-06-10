// dependencies
import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

// components
import Weather from './widgetWindow/Weather';
import WaterHistory from './widgetWindow/WaterHistory';

@Radium
class WidgetWindow extends React.Component {
  getWidgetComponent() {
    switch (this.props.widgetWindow.kind) {
      case 'watertank': return <WaterHistory />; break;
      case 'weather':   return <Weather />;      break;
      default: return null;
    }
  }

  render() {
    let widget = this.getWidgetComponent();
    let active = (this.props.widgetWindow.active) ? 'active' : '';

    return (
        <div style={ [styles.base, styles[active]] }>
          {widget}
        </div>
    );
  }
}

const styles = {
  base: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '175px',
    background: 'linear-gradient(-45deg, rgb(47, 54, 58) 0%, rgb(62, 77, 86) 36%, rgb(47, 54, 58) 100%)',
    borderTop: '1px solid rgb(141, 141, 141)',
    overflow: 'hidden',
    transform: 'translateY(176px)',
    transition: 'transform .3s cubic-bezier(.825, 0, .5, 1)',
  },

  active: {
    transform: 'translateY(0)',
  },
};

function mapStateToProps(state) {
  return {
    widgetWindow: state.widgetWindow,
  };
}

export default connect(mapStateToProps)(WidgetWindow);
