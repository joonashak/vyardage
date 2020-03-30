import React from 'react';
import { Typography, Link, Grid } from '@material-ui/core';
import { useStore } from 'react-hookstore';
import { Link as RouterLink } from 'react-router-dom';
import ViewWrapper from './ViewWrapper';


export default () => {
  const [loggedIn] = useStore('loggedIn');

  return (
    <ViewWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Welcome to Vyardage!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            You can find more information about this app at <Link href="https://github.com/joonashak/vyardage" color="secondary">https://github.com/joonashak/vyardage</Link>.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {loggedIn ? (
            <Typography variant="body1">
              Use the menu at the top to access app features.
            </Typography>
          ) : (
            <Typography variant="body1">
              Please <Link component={RouterLink} to="/login" color="secondary">log in</Link> to begin. At this time, public registrations are not allowed.
            </Typography>
          )}
        </Grid>
      </Grid>
    </ViewWrapper>
  );
};
