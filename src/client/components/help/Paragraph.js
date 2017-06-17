// dependencies
import React, { PropTypes } from 'react';

const Paragraph = ({ children, marginTop }) => {
  const styles = {
    ...style.base,
    marginTop,
  };
  return <div style={styles}> {children} </div>;
};

Paragraph.propTypes = {
  marginTop: PropTypes.string,
};

const style = {
  base: {
    marginBottom: '10px',
  },

  marginTop: {
    marginTop: '20px',
  },
};

export default Paragraph;
