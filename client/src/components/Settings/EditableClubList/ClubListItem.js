import React from 'react';
import {
  ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, makeStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ConfirmableDeleteIconButton from '../../forms/ConfirmableDeleteIconButton';
import useData from '../../../context/useData';


const useStyles = makeStyles(() => ({
  root: {
    flexDirection: 'row-reverse',
  },
}));

export default ({ club }) => {
  const classes = useStyles();
  const { deleteClub } = useData();

  return (
    <ListItem classes={classes}>
      <ListItemIcon>
        <IconButton aria-label="delete">
          <EditIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemText primary={club.name} />
      <ListItemSecondaryAction>
        <ConfirmableDeleteIconButton name={club.name} onRemove={() => deleteClub(club)} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
