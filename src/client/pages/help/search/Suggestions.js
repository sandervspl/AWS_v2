// dependencies
import React, {} from 'react';

const Suggestions = () => (
  <div style={style.base}>
    <ul>
      <li>1</li>
      <li>2</li>
    </ul>
  </div>
);

Suggestions.propTypes = {};

const style = {
  base: {
    boxSizing: 'border-box',
    position: 'absolute',
    top: '28px',
    left: 0,
    padding: '10px',
    width: '100%',
    background: '#eee',
    color: '#000',
    border: '1px solid #BABABA'
  },
};

export default Suggestions;
