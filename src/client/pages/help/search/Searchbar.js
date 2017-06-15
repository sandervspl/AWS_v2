// dependencies
import React from 'react';
// import Suggestions from './Suggestions';

const Searchbar = () => (
    <div style={style.base}>
      <input style={style.searchbar} type="text" placeholder="Zoeken..." />
      {/*<Suggestions />*/}
    </div>
);

const style = {
  base: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '90%',
  },

  searchbar: {
    padding: '3px',
    width: '100%',
    fontSize: '15px',
  },
};

export default Searchbar;
