// dependencies
import React from 'react';
import { Link, withRouter } from 'react-router';

// components
import Icon from 'components/Icon';

const BackButton = ({ location }) => {
  const url = location.pathname === '/help' ? '/' : '/help';

  return (
    <Link to={url}>
      <div style={style.base} className="nav-help__back-button">
        <Icon name="chevron-left" />
      </div>
    </Link>
  );
};

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

export default withRouter(BackButton);
