// dependencies
import React from 'react';
import TitleSmall from 'components/TitleSmall';

const InShortBlock = ({ children }) =>
  <div style={style.base}>
    <TitleSmall>In het kort</TitleSmall>
    {children}
  </div>;

const style = {
  base: {
    margin: '20px 0',
    padding: '10px',
    backgroundColor: '#DFE0E0',
    color: '#686a6c',
  },
};

export default InShortBlock;
