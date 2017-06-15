// dependencies
import React, { PropTypes } from 'react';

const Image = ({ img, alt, blockWidth }) => {
  let styles = { ...style.base };
  if (blockWidth) styles = { ...styles, ...style.blockWidth };

  return <img src={img} alt={alt} style={styles} />;
};

Image.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  blockWidth: PropTypes.bool,
};

Image.defaultValues = {
  blockWidth: false,
};

const style = {
  base: {},

  blockWidth: {
    width: '100%',
  },
};

export default Image;
