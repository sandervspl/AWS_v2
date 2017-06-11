// dependencies
import React from 'react';
import Radium from 'radium';

// components
import BigButton from '../BigButton';
import Logo from '../Logo';
import WidgetMenu from '../WidgetMenu';
import WidgetWindow from '../WidgetWindow';

@Radium
export default class Menu extends React.Component {
  render() {
    return (
        <div style={styles.base}>
          <Logo />
          <WidgetMenu setActiveView={this.props.setActiveView} />
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