// dependencies
import React from 'react';

const TitleSmall = ({ children }) => <h4 style={style.base}>{children}</h4>;

const style = {
  base: {
    margin: '0 0 5px',
    padding: 0,
    fontSize: '1rem',
    color: '#000',
  },
};

export default TitleSmall;
