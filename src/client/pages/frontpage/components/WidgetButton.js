// dependencies
import React, { PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Watertank from './widgets/Watertank';
import Grid from './widgets/Grid';
import Weather from './widgets/Weather';

// actions
import * as widgetWindowActions from 'ducks/modules/widgetWindow';

@Radium
class WidgetButton extends React.Component {
  static propTypes = {
    setActiveView: PropTypes.func,
  };

  handleClick = () => {
    const { kind, widgetWindow, widgetWindowActions, setActiveView } = this.props;
    const { openWindow, closeWindow } = widgetWindowActions;
    const { kind: activeKind } = widgetWindow;

    if (kind === 'grid') {
      let time = 0;

      // close widget window, if active, before going to new view
      if (widgetWindow.active) {
        closeWindow();
        time = 325;  // .325 seconds
      }

      setTimeout(() => setActiveView('grid'), time);
    } else {
      if (widgetWindow.active && kind === activeKind) {
        closeWindow();
      } else {
        openWindow(kind);
      }
    }
  };

  render() {
    let button = null;
    let tag = '';

    switch (this.props.kind) {
      case 'watertank':
        button = <Watertank />;
        tag = 'Wateropslag';
        break;

      case 'grid':
        button = <Grid />;
        tag = 'Overzicht';
        break;

      case 'weather':
        button = <Weather />;
        tag = 'Weer';
        break;
    }

    const spacing = this.props.kind === 'grid' ? styles.spacing : {};

    return (
        <li style={ [styles.base, spacing] }>
          <div
              style={ [styles.inner, styles[this.props.kind]] }
              className="widget-btn"
              onClick={this.handleClick}
          >
            {button}
          </div>
          <span style={styles.tag}> {tag} </span>
        </li>
    );
  }
}

const styles = {
  base: {
    position: 'relative',
    display: 'inline-block',
    width: '70px',
    height: '70px',
    verticalAlign: 'top',
    lineHeight: '50px',
    textAlign: 'center',

    ':hover': {
      cursor: 'pointer',
    },
  },

  spacing: {
    margin: '0 30px 20px',
  },

  inner: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },

  watertank: {
    borderRadius: '33%',
    background: '#eee',
  },

  weather: {
    borderRadius: '33%',
    background: '#eee',
  },

  tag: {
    fontSize: '14px',
    position: 'relative',
    top: '-10px',
  },
};

function mapStateToProps(state) {
  return {
    widgetWindow: state.widgetWindow,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    widgetWindowActions: bindActionCreators(widgetWindowActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetButton);
