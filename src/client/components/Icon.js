// dependencies
import React, { PropTypes } from 'react';

const Icon = ({ name, originalWidth }) =>
  <div style={!originalWidth ? style.base : {}}>
    <i className={`fa fa-${name}`} aria-hidden="true" />
  </div>;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  originalWidth: PropTypes.bool,
};

Icon.defaultValues = {
  originalWidth: false,
};

const style = {
  base: {
    display: 'inline-block',
    width: '2rem',
  },
};

export default Icon;
