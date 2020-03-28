import React from 'react';
import { Grid, Container } from '@material-ui/core';
import { createStore, useStore } from 'react-hookstore';
import LoginButton from './LoginButton';
import Menu from './Menu';


createStore('loggedIn', false);

export default () => {
  const [loggedIn] = useStore('loggedIn');

  return (
    <Grid container alignItems="stretch">
      <Container maxWidth="lg">
        Vyardage.
        {loggedIn ? <Menu /> : <LoginButton />}
      </Container>
    </Grid>
  );
};
