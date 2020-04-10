import React from 'react';
import { Grid } from '@material-ui/core';
import NumberField from './NumberField';


export default ({ formControl }) => (
  <>
    <Grid item xs={6}>
      <NumberField
        formControl={formControl}
        name="spin"
        label="Spin"
        rules={{
          required: 'Spin is required.',
          min: { value: -100, message: 'Minimum spin is -100.' },
          max: { value: 100, message: 'Maximum spin is 100.' },
        }}
        unit="%"
        signButton
      />
    </Grid>
    <Grid item xs={6}>
      <NumberField
        formControl={formControl}
        name="power"
        label="Power"
        rules={{
          required: 'Power is required.',
          min: { value: 0, message: 'Minimum power is 0.' },
          max: { value: 100, message: 'Maximum power is 100.' },
        }}
        unit="%"
      />
    </Grid>
    <Grid item xs={12}>
      <NumberField
        formControl={formControl}
        name="actCarry"
        label="Carry Distance"
        rules={{
          required: 'Carry distance is required.',
          min: { value: 0, message: 'Minimum carry is 0.' },
          max: { value: 400, message: 'Maximum carry is 400.' },
        }}
        unit="yds"
      />
    </Grid>
  </>
);
