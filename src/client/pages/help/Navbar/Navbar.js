// dependencies
import React from 'react';

// components
import BackButton from './BackButton';

const Navbar = () =>
  <div style={style.base}>
    <BackButton />
    <h1 style={style.title}>Advanced Water Systems</h1>
  </div>;

const style = {
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '50px',
    backgroundColor: '#364249',
    textAlign: 'center',
    color: '#fff',
  },

  title: {
    display: 'inline-block',
    marginLeft: '-50px',
    fontSize: '18px',
    lineHeight: '50px',
  },
};

export default Navbar;
