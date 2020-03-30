import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField, Button, Grid, Typography,
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useStore } from 'react-hookstore';
import { login } from '../../services/loginService';


export default () => {
  const { handleSubmit, control, errors } = useForm({ mode: 'onBlur' });
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
        <Controller
          as={TextField}
          name="username"
          control={control}
          defaultValue=""
          label="Username"
          autoComplete="username"
          variant="filled"
          rules={{ required: 'Username cannot be empty' }}
          error={!!errors.username}
          helperText={errors.username && errors.username.message}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          as={TextField}
          name="password"
          control={control}
          defaultValue=""
          label="Password"
          autoComplete="current-password"
          variant="filled"
          type="password"
          rules={{ required: 'Password cannot be empty' }}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button
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
