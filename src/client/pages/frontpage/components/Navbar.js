// dependencies
import React from 'react';
import Radium from 'radium';

@Radium
export default class Topbar extends React.Component {
  handleBackBtnClick = () => this.props.setActiveView('menu');

  render() {
    let backBtn = this.props.title !== 'menu'
        ? <span style={styles.btnActive} onClick={this.handleBackBtnClick}> {`< menu`} </span>
        : <span style={styles.btnInactive}> {`<`} </span>;

    return (
        <div style={styles.base}>
          <div style={ [styles.item, styles.left] }>
            {backBtn}
          </div>
          <div style={ [styles.item, styles.title] }>
            <span> {this.props.title} </span>
          </div>
          <div style={ [styles.item, styles.right] } />
        </div>
    );
  }
}

const styles = {
  base: {
    position: 'fixed',
    zIndex: 101,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto',
    height: '45px',
    width: '100%',
    background: '#EEE',
  },

  item: {
    display: 'flex',
    flexGrow: 0,
    width: 'calc(33.33333% - 20px)',
    color: 'black',
    textTransform: 'capitalize',
    fontWeight: 400,
  },

  title: {
    flexGrow: 0,
    justifyContent: 'center',
    width: '33.33333%',
  },

  left: {
    paddingLeft: '20px',
    justifyContent: 'flex-start',
  },

  right: {
    paddingRight: '20px',
    justifyContent: 'flex-end',
  },

  btnActive: {
    cursor: 'pointer',
  },

  btnInactive: {
    cursor: 'default',
    color: 'lightgrey',
  },
};
