// dependencies
import React from 'react';

// components
import Navbar from './Navbar/Navbar';
import Search from './search/Search';

const Help = ({ children }) =>
  <div style={style.base}>
    <Navbar />
    <Search />
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
    padding: '10px 20px',
    fontSize: '.9rem',
  },
};

export default Help;
