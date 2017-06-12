// dependencies
import React from 'react';

const Searchbar = () => (
    <div>
      <input style={style.base} type="text" placeholder="Zoeken..." />
    </div>
);

const style = {
  base: {
    padding: '3px',
    fontSize: '15px',
  },
};

export default Searchbar;
