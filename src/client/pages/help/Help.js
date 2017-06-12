// dependencies
import React from 'react';

// components
import Navbar from './Navbar/Navbar';
import Search from './search/Search';

const Help = ({ children }) => (
  <div style={style.base}>
    <Navbar />
    <Search />
    <div style={style.content}>
      { children }
    </div>
  </div>
);

const style = {
  base: {
    padding: '50px 0',
    height: '100%',
    backgroundColor: '#eee',
  },

  content: {
    padding: '10px 20px',
  }
};

export default Help;
