// dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Title from 'components/help/Title';

const Item = ({ children, url }) => (
    <li>
      <Link to={url}>
        <Title>{ children }</Title>
      </Link>
    </li>
);

Item.propTypes = {
  url: PropTypes.string.isRequired,
}

export default Item;
