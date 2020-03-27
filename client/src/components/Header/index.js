import React from 'react';
import { Grid, Container } from '@material-ui/core';
import LoginButton from './LoginButton';


export default () => (
  <Grid container alignItems="stretch">
    <Container maxWidth="lg">
      Vyardage.
      <LoginButton />
    </Container>
  </Grid>
);
