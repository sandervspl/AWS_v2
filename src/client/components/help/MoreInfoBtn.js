// dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// components
import Icon from 'components/Icon';

const MoreInfoBtn = ({ url }) =>
  <Link to={url}>
    <div style={style.base}>
      Meer informatie
      <div style={style.icon}>
        <Icon name="chevron-right" originalWidth />
      </div>
    </div>
  </Link>;

MoreInfoBtn.propTypes = {
  url: PropTypes.string.isRequired,
};

const style = {
  base: {
    marginTop: '10px',
    padding: '5px',
    backgroundColor: '#364249',
    fontSize: '1rem',
  },

  icon: {
    float: 'right',
  },
};

export default MoreInfoBtn;
