import React from 'react';
import {
  ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, makeStyles,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { useForm } from 'react-hook-form';
import useData from '../../../context/useData';
import useNotification from '../../GlobalNotification/useNotification';
import ControlledInput from '../../forms/ControlledInput';


const useStyles = makeStyles(() => ({
  root: {
    flexDirection: 'row-reverse',
  },
}));

export default ({ club, toggleEditable }) => {
  const classes = useStyles();
  const { upsertClub } = useData();
  const { setNotification } = useNotification();
  const formControl = useForm({ mode: 'onBlur' });
  const { handleSubmit } = formControl;

  const submit = async (data) => {
    const newClub = { id: club.id, name: data.name, clubType: club.clubType };

    try {
      await upsertClub(newClub);
      setNotification('Club updated!', 'success', true);
      toggleEditable();
    } catch (error) {
      setNotification(`Updating club failed: ${error.response && error.response.data.message}`, 'error');
    }
  };

  return (
    <ListItem classes={classes}>
      <ListItemIcon>
        <IconButton onClick={handleSubmit(submit)} data-cy="submit">
          <CheckIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemText>
        <ControlledInput
          formControl={formControl}
          name="name"
          label="Club Name"
          rules={{ required: 'Club name is required.' }}
          id={`name-${club.id}`}
          defaultValue={club.name}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={toggleEditable}>
          <CloseIcon color="secondary" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
