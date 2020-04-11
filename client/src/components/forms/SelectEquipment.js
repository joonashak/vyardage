import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import {
  TextField, Grid, Typography,
} from '@material-ui/core';


export default ({ gameData, setEquipment }) => {
  const { balls } = gameData;

  return (
    <Grid container alignItems="center" justify="center" spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5">
          Select Equipment
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        {/* FIXME: Handle empty ball array. */}
        <Autocomplete
          id="select-ball"
          options={balls}
          getOptionLabel={(ball) => ball.name}
          renderInput={(params) => <TextField {...params} label="Ball" variant="outlined" fullWidth />}
          onChange={(_, value) => setEquipment({ ball: value })}
          data-cy="select-ball"
        />
      </Grid>
    </Grid>
  );
};
