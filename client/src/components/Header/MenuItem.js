import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';


export default ({ icon, text, to }) => (
  <ListItem button component={NavLink} to={to} activeClassName="Mui-selected" exact>
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText>
      {text}
    </ListItemText>
  </ListItem>
);
