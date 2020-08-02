import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid, IconButton, Dialog, DialogTitle, DialogContent, makeStyles,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ControlledInput from '../../forms/ControlledInput';
import useNotification from '../../GlobalNotification/useNotification';
import useData from '../../../context/useData';


const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: '24px',
  },
}));

export default ({ ball, open, onClose }) => {
  // FIXME: Refactor this shit.
  const {
    id, name, distance, spin,
  } = ball || {
    id: '', name: '', distance: '', spin: '',
  };

  const classes = useStyles();
  const { upsertBall } = useData();
  const { setNotification } = useNotification();
  const formControl = useForm({ mode: 'onBlur' });
  const { handleSubmit } = formControl;

  const submit = async (data) => {
    const newBall = {
      name: data.name,
      distance: data.distance * 1,
      spin: data.spin * 1,
    };

    try {
      await upsertBall({ id, ...newBall });
      setNotification(`Ball ${ball ? 'updated' : 'added'}!`, 'success', true);
      onClose();
    } catch (error) {
      setNotification(
        `${ball ? 'Updating' : 'Adding'} ball failed: ${error.response && error.response.data.message}`,
        'error',
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        {ball ? 'Edit Ball' : 'New Ball'}
      </DialogTitle>
      <DialogContent classes={classes}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ControlledInput
              formControl={formControl}
              name="name"
              label="Name"
              rules={{ required: 'Ball name is required.' }}
              id={`name-${id}`}
              defaultValue={name}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <ControlledInput
              formControl={formControl}
              name="distance"
              label="Distance"
              rules={{
                required: 'Distance metric is required.',
                min: { value: 0, message: 'Minimum value is 0.' },
                max: { value: 6, message: 'Maximum value is 6.' },
                pattern: /^[0-6](\.[0-9])?$/,
              }}
              id={`distance-${id}`}
              defaultValue={distance}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <ControlledInput
              formControl={formControl}
              name="spin"
              label="Spin"
              rules={{
                required: 'Spin metric is required.',
                min: { value: 0, message: 'Minimum value is 0.' },
                max: { value: 4, message: 'Maximum value is 4.' },
                pattern: /^[0-4](\.[0-9])?$/,
              }}
              id={`spin-${id}`}
              defaultValue={spin}
            />
          </Grid>
          <Grid container justify="flex-end" spacing={3}>
            <Grid item>
              <IconButton onClick={handleSubmit(submit)}>
                <CheckIcon />
              </IconButton>
              <IconButton color="secondary" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
