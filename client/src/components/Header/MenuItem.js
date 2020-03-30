import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default ({ icon, text, to }) => (
  <ListItem button component={Link} to={to}>
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText>
      {text}
    </ListItemText>
  </ListItem>
);
