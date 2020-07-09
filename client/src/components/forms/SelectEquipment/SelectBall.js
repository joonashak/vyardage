import React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useData from '../../../context/useData';


export default () => {
  const { balls, equipment, setEquipment } = useData();
  const setBall = (ball) => {
    localStorage.setItem('vyardage.equipment.ballId', ball.id);
    setEquipment({ ball });
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
