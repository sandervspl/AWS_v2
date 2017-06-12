// dependencies
import React from 'react';
import Item from './Item';

const HelpMenu = () => (
    <div>
      <h1 style={style.title}>Help menu</h1>
      <ul id="helpmenu">
        <Item url="/help/start">Aan de slag met AWS</Item>
        <Item url="/help/startscherm">Startscherm</Item>
        <Item url="/help/wateropslag">Wateropslag</Item>
        <Item url="/help/overzicht">Overzicht</Item>
        <Item url="/help/weer">Weer</Item>
        <Item url="/help/drainage">Drainage</Item>
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
