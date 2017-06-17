// dependencies
import React from 'react';

// components
import Navbar from './Navbar/Navbar';

const Help = ({ children }) =>
  <div style={style.base}>
    <Navbar />
    <div style={style.content}>
      {children}
    </div>
  </div>;

const style = {
  base: {
    padding: '50px 0',
    minHeight: 'calc(100% - 100px)',
    backgroundColor: '#eee',
    color: '#000',
  },

  content: {
    padding: '0 20px 10px',
    fontSize: '.9rem',
  },
};

export default Help;
