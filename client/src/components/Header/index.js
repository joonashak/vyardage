import React from 'react';
import {
  Grid, Container, Typography, useTheme,
} from '@material-ui/core';
import { useStore } from 'react-hookstore';
import LoginButton from './LoginButton';
import Menu from './Menu';


export default () => {
  const [loggedIn] = useStore('loggedIn');

  const theme = useTheme();

  const headerStyle = {
    backgroundColor: theme.palette.primary.dark,
    paddingTop: '3px',
    paddingBottom: '3px',
    marginBottom: '2rem',
  };

  return (
    <Grid container alignItems="stretch" style={headerStyle}>
      <Container maxWidth="md">
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography variant="h6">
              Vyardage
            </Typography>
          </Grid>
          <Grid item xs style={{ textAlign: 'right' }}>
            {loggedIn ? <Menu /> : <LoginButton />}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};
