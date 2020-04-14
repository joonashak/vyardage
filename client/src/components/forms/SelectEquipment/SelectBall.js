import React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';


export default ({ balls, equipment, setEquipment }) => {
  const setBall = (ball) => {
    localStorage.setItem('vyardage.equipment.ballId', ball.id);
    setEquipment((prev) => ({ ...prev, ball }));
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">
          Ball
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Autocomplete
          id="select-ball"
          options={balls}
          getOptionLabel={(ball) => ball.name}
          renderInput={(params) => <TextField {...params} label="Ball" variant="outlined" fullWidth />}
          onChange={(_, value) => setBall(value)}
          value={equipment.ball || null}
          data-cy="select-ball"
        />
      </Grid>
    </>
  );
};
