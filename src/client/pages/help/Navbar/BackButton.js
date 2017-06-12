// dependencies
import React, {} from 'react';

// components
import Icon from 'components/Icon';

const BackButton = () => (
  <div style={style.base}>
    <Icon name='chevron-left' />
  </div>
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
  },
};

export default BackButton;
