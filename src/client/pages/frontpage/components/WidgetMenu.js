// dependencies
import React from 'react';
import Radium from 'radium';

// components
import WidgetButton from './WidgetButton';

@Radium
export default class WidgetMenu extends React.Component {
  render() {
    return (
        <div style={styles.base}>
          <ul>
            <WidgetButton kind="watertank" />
            <WidgetButton setActiveView={this.props.setActiveView} kind="grid" />
            <WidgetButton kind="weather" />
          </ul>
        </div>
    );
  }
}

const styles = {
  base: {
    margin: '40px auto 0',
    textAlign: 'center',
  },
};