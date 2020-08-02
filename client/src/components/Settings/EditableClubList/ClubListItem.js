import React, { useState } from 'react';
import {
  ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, makeStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ConfirmableDeleteIconButton from '../../forms/ConfirmableDeleteIconButton';
import useData from '../../../context/useData';
import useNotification from '../../GlobalNotification/useNotification';
import EditableClubListItem from './EditableClubListItem';


const useStyles = makeStyles(() => ({
  root: {
    flexDirection: 'row-reverse',
  },
}));

export default ({ club }) => {
  const classes = useStyles();
  const { deleteClub } = useData();
  const { setNotification } = useNotification();
  const [editable, setEditable] = useState(false);
  const toggleEditable = () => setEditable((prev) => !prev);

  const onRemove = async () => {
    try {
      await deleteClub(club);
      setNotification('Club removed!', 'success', true);
    } catch (error) {
      setNotification(`Removing club failed: ${error.response && error.response.data.message}`, 'error');
    }
  };

  return editable ? (
    <EditableClubListItem club={club} toggleEditable={toggleEditable} />
  ) : (
    <ListItem classes={classes} onClick={toggleEditable}>
      <ListItemIcon>
        <IconButton data-cy={`edit-${club.name}`}>
          <EditIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemText>
        {club.name}
      </ListItemText>
      <ListItemSecondaryAction data-cy={`delete-${club.name}`}>
        <ConfirmableDeleteIconButton name={club.name} onRemove={onRemove} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
