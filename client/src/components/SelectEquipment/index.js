import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import {
  TextField, Grid, Typography, Button,
} from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';


export default ({ gameData, setEquipment }) => {
  const { balls } = gameData;
  const [chosenBall, setChosenBall] = useState();

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
          onChange={(_, value) => setChosenBall(value)}
          data-cy="select-ball"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => setEquipment({ ball: chosenBall })}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PlayCircleOutlineIcon />}
          fullWidth
        >
          Start Playing
        </Button>
      </Grid>
    </Grid>
  );
};
