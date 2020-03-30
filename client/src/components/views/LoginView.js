import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStore } from 'react-hookstore';
import { Redirect } from 'react-router-dom';
import ViewWrapper from './ViewWrapper';
import LoginForm from '../authentication/LoginForm';


export default () => {
  const [loggedIn] = useStore('loggedIn');

  return loggedIn ? (<Redirect to="/" />) : (
    <ViewWrapper>
      <form>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h5">
              Login
            </Typography>
          </Grid>
          <LoginForm />
        </Grid>
      </form>
    </ViewWrapper>
  );
};
