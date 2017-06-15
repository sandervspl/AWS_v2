// dependencies
import React from 'react';

const Title = ({ children }) => <h1 style={style.base}>{children}</h1>;

const style = {
  base: {
    paddingBottom: '10px',
    color: '#000',
    fontSize: '20px',
    fontWeight: 400,
    borderBottom: '1px solid #95989A',
  },
};

export default Title;
