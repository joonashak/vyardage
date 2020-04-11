import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, Typography } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useStore } from 'react-hookstore';
import { login } from '../../services/loginService';
import ControlledInput from '../forms/ControlledInput';


export default () => {
  const formControl = useForm({ mode: 'onBlur' });
  const { handleSubmit, errors } = formControl;
  const [, setLoggedIn] = useStore('loggedIn');
  const [, setNotification] = useStore('globalNotification');

  const submit = async (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const { username, password } = data;
    const res = await login(username, password);

    if (res.error) {
      setNotification({
        type: 'error',
        message: `Login failed: ${res.error.response.data.message}`,
      });

      return;
    }

    setLoggedIn(true);
    setNotification({ type: 'success', message: 'You were logged in!', autoHide: true });
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          Enter your credentials to log in.
        </Typography>
        <Typography variant="body2" style={{ fontStyle: 'italic' }}>
          (This app does not allow public registrations.)
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledInput
          formControl={formControl}
          name="username"
          label="Username"
          autoComplete="username"
          rules={{ required: 'Username cannot be empty' }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlledInput
          formControl={formControl}
          name="password"
          label="Password"
          autoComplete="current-password"
          type="password"
          rules={{ required: 'Password cannot be empty' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          onClick={handleSubmit(submit)}
          variant="contained"
          color="primary"
          startIcon={<LockOpenIcon />}
          fullWidth
        >
          Log In
        </Button>
      </Grid>
    </>
  );
};
