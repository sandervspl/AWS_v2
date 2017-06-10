// dependencies
const React = require('react');
const Radium = require('radium');

const gridImg = require('../../../../../../static/assets/img/grid.png');

@Radium
export default class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

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