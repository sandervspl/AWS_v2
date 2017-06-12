// dependencies
import React, {} from 'react';
import { Link } from 'react-router';

// components
import Icon from 'components/Icon';

const BackButton = () => (
  <Link to="/">
    <div style={style.base} className="nav-help__back-button">
      <Icon name='chevron-left' />
    </div>
  </Link>
);

BackButton.propTypes = {};

const style = {
  base: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '50px',
    verticalAlign: 'top',
    float: 'left',
    cursor: 'pointer',
  },
};

export default BackButton;
