// dependencies
import React from 'react';
import { Link } from 'react-router';

const NotFound = () =>
  <div style={style.base}>
    <h1>404</h1>
    <h3>Page not found!</h3>
    <p style={style.link}>
      <Link to="/" style={style.link}>Go back to the main page</Link>
    </p>
  </div>;

const style = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
  },

  link: {
    marginTop: '20px',
    color: 'aqua',
  },
};

export default NotFound;
