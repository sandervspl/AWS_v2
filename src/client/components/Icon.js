// dependencies
import React, { PropTypes } from 'react';
import Radium from 'radium';

const Icon = ({ name, originalWidth, smallSpacing }) => {
  let styles = style.base;

  if (originalWidth) styles = { ...styles, ...style.spacing };
  if (smallSpacing) styles = { ...styles, ...style.smallSpacing };

  return (
    <div style={styles}>
      <i className={`fa fa-${name}`} aria-hidden="true" />
    </div>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  originalWidth: PropTypes.bool,
  smallSpacing: PropTypes.bool,
};

Icon.defaultValues = {
  originalWidth: false,
  smallSpacing: false,
};

const style = {
  base: {
    display: 'inline-block',
  },

  spacing: {
    width: '2rem',
  },

  smallSpacing: {
    width: '1rem',
  },
};

export default Radium(Icon);
