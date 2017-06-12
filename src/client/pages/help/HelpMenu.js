// dependencies
import React from 'react';
import { Link } from 'react-router';
import Title from 'components/help/Title';

// style
// import './HelpMenu.css';

const HelpMenu = () => (
    <div>
      <h1 style={style.title}>Help menu</h1>
      <ul id="helpmenu">
        <li>
          <Link to="/help/start">
            <Title>Aan de slag met AWS</Title>
          </Link>
        </li>
        <li>
          <Link to="/help/wateropslag">
            <Title>Wateropslag</Title>
          </Link>
        </li>
        <li>
          <Link to="/help/overzicht">
            <Title>Overzicht</Title>
          </Link>
        </li>
        <li>
          <Link to="/help/weer">
            <Title>Weer</Title>
          </Link>
        </li>
        <li>
          <Link to="/help/drainage">
            <Title>Drainage</Title>
          </Link>
        </li>
      </ul>
    </div>
);

const style = {
  title: {
    marginBottom: '20px',
    color: '#000',
  },
};

export default HelpMenu;
