// dependencies
import React, { PropTypes } from 'react';

const Icon = ({ name }) => (
    <div style={style.base}>
      <i className={`fa fa-${name}`} aria-hidden="true" />
    </div>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

const style = {
  base: {
    display: 'inline-block',
    width: '2rem',
  },
};

export default Icon;
