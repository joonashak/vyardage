import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ControlledInput from '../forms/ControlledInput';


export default ({ ball }) => {
  const {
    id, name, distance, spin,
  } = ball || { id: '' };

  const formControl = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (ball) {
      formControl.setValue('name', name);
      formControl.setValue('distance', distance);
      formControl.setValue('spin', spin);
    }
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <ControlledInput
          formControl={formControl}
          name="name"
          label="Name"
          rules={{ required: 'Ball name is required.' }}
          id={`name-${id}`}
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
          }}
          id={`distance-${id}`}
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
          }}
          id={`spin-${id}`}
        />
      </Grid>
      <Grid item xs={6} md={2}>
        <IconButton>
          <CheckIcon />
        </IconButton>
        <IconButton color="secondary">
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
