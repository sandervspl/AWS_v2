// dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// components
import Icon from 'components/Icon';

const Item = ({ children, url }) =>
  <li>
    <Link to={url}>
      <div style={style.base} className="help__item">
        {children}
        <div style={style.icon}>
          <Icon name="chevron-right" smallSpacing />
        </div>
      </div>
    </Link>
  </li>;

Item.propTypes = {
  url: PropTypes.string.isRequired,
};

const style = {
  base: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#364249',
    fontSize: '1rem',
  },

  icon: {
    float: 'right',
  },
};

export default Item;
