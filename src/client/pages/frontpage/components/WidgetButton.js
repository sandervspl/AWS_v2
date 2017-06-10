// dependencies
import React from 'react';
import Radium from 'radium';

// components
import Watertank from './widgets/Watertank';
import Grid from './widgets/Grid';
import Weather from './widgets/Weather';

// actions
import * as widgetWindowActions from '../../../actions/WidgetWindowActions';
import * as navbarActions from '../../../actions/NavbarActions';

@Radium
export default class WidgetButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handeClick = () => {
    if (this.props.kind === 'grid') {
      let time = 0;

      // close widget window, if active, before going to new view
      if (widgetWindowStore.getWindow().active) {
        widgetWindowActions.closeWidgetWindow();
        time = 325;  // .325 seconds
      }

      setTimeout(() => navbarActions.navFromTo('menu', 'grid'), time);
    } else {
      this.activateWindow();
    }
  };

  activateWindow = () => widgetWindowActions.toggleWidgetWindow(this.props.kind);

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
              onClick={this.handeClick}
          >
            {button}
          </div>
          <span style={styles.tag}>{tag}</span>
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