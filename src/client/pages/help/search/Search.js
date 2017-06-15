// dependencies
import React from 'react';
import Searchbar from './Searchbar';

const Search = () =>
  <div style={style.base}>
    <Searchbar />
  </div>;

const style = {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50px',
    backgroundColor: '#DFE0E0',
  },
};

export default Search;
