import React from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';


export default ({ text }) => (
  <Grid
    container
    direction="column"
    alignItems="center"
    spacing={3}
    style={{ paddingTop: '2rem' }}
  >
    <Grid item>
      <CircularProgress color="secondary" />
    </Grid>
    <Grid item>
      <Typography variant="body2" style={{ fontStyle: 'italic' }}>
        {text}
      </Typography>
    </Grid>
  </Grid>
);
