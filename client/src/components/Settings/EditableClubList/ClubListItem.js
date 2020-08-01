import React, { useState } from 'react';
import {
  ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, makeStyles,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { useForm } from 'react-hook-form';
import ConfirmableDeleteIconButton from '../../forms/ConfirmableDeleteIconButton';
import useData from '../../../context/useData';
import useNotification from '../../GlobalNotification/useNotification';
import ControlledInput from '../../forms/ControlledInput';


const useStyles = makeStyles(() => ({
  root: {
    flexDirection: 'row-reverse',
  },
}));

export default ({ club }) => {
  const classes = useStyles();
  const { deleteClub, upsertClub } = useData();
  const [editable, setEditable] = useState(false);
  const toggleEditable = () => setEditable((prev) => !prev);

  const { setNotification } = useNotification();
  const formControl = useForm({ mode: 'onBlur' });
  const { handleSubmit } = formControl;

  const submit = async (data) => {
    const newClub = { id: club.id, name: data.name, clubType: club.clubType };

    try {
      await upsertClub(newClub);
      setNotification('Club updated!', 'success', true);
      setEditable(false);
    } catch (error) {
      setNotification(`Updating club failed: ${error.response && error.response.data.message}`, 'error');
    }
  };

  return (
    <ListItem classes={classes} onClick={editable ? null : toggleEditable}>
      <ListItemIcon>
        {editable ? (
          <IconButton onClick={handleSubmit(submit)}>
            <CheckIcon />
          </IconButton>
        )
          : (
            <IconButton>
              <EditIcon />
            </IconButton>
          )}
      </ListItemIcon>
      <ListItemText>{editable ? (
        <ControlledInput
          formControl={formControl}
          name="name"
          label="Club Name"
          rules={{ required: 'Club name is required.' }}
          id={`name-${club.id}`}
          defaultValue={club.name}
        />
      ) : club.name}
      </ListItemText>
      <ListItemSecondaryAction>
        {editable
          ? (
            <IconButton onClick={toggleEditable}>
              <CloseIcon color="secondary" />
            </IconButton>
          )
          : <ConfirmableDeleteIconButton name={club.name} onRemove={() => deleteClub(club)} />}
      </ListItemSecondaryAction>
    </ListItem>
  );
};
