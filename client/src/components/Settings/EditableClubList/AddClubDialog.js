import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog, DialogTitle, DialogContent, Grid, IconButton, Button, makeStyles,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import useData from '../../../context/useData';
import useNotification from '../../GlobalNotification/useNotification';
import ControlledInput from '../../forms/ControlledInput';


const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: '24px',
  },
}));

export default ({ clubType }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { upsertClub } = useData();
  const { setNotification } = useNotification();
  const formControl = useForm({ mode: 'onBlur' });
  const { handleSubmit } = formControl;

  const submit = async (data) => {
    const { name } = data;
    const acualClubType = clubType === 'Iron set' ? '3-iron' : clubType;
    const newClub = { name, clubType: acualClubType };

    try {
      await upsertClub(newClub);
      setNotification('Club added!', 'success', true);
      setOpen(false);
    } catch (error) {
      setNotification(
        `Adding club failed: ${error.response && error.response.data.message}`,
        'error',
      );
    }
  };

  return (
    <>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        startIcon={<AddCircleIcon />}
        onClick={() => setOpen(true)}
        fullWidth
        data-cy="add-club-button"
      >
        {`Add ${clubType}`}
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          Add Club
        </DialogTitle>
        <DialogContent classes={classes}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ControlledInput
                formControl={formControl}
                name="name"
                label="Name"
                rules={{ required: 'Ball name is required.' }}
                id="new-club-name"
              />
            </Grid>
            <Grid container justify="flex-end" spacing={3}>
              <Grid item>
                <IconButton onClick={handleSubmit(submit)}>
                  <CheckIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
