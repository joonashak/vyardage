import React from 'react';
import {
  ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, makeStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(() => ({
  root: {
    flexDirection: 'row-reverse',
  },
}));

export default ({ club }) => {
  const classes = useStyles();

  return (
    <ListItem classes={classes}>
      <ListItemIcon>
        <IconButton aria-label="delete">
          <EditIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemText primary={club.name} />
      <ListItemSecondaryAction>
        <IconButton color="secondary" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
