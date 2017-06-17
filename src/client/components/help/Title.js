// dependencies
import React from 'react';

const Title = ({ children }) => <h1 style={style.base}> {children} </h1>;

const style = {
  base: {
    margin: '20px 0',
    color: '#000',
    fontSize: '1.5rem',
  },
};

export default Title;
