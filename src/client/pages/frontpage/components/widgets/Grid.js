// dependencies
import React from 'react';
import Radium from 'radium';

const gridImg = require('assets/img/grid.png');

@Radium
export default class Grid extends React.Component {
  render() {
    return (
        <div style={styles.base}>
          <img src={gridImg} alt="grid" style={styles.img} />
        </div>
    );
  }
}

const styles = {
  base: {
    position: 'relative',
    textAlign: 'center',
    top: 'calc(50% - 25px)',
  },

  img: {
    width: '75%',
  },
};
