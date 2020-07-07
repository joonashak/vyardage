import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button, Grid, Typography, FormControlLabel, Checkbox,
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { login } from '../../services/loginService';
import ControlledInput from '../forms/ControlledInput';
import useNotification from '../GlobalNotification/useNotification';
import useAuthentication from './useAuthentication';


export default () => {
  const formControl = useForm({ mode: 'onBlur' });
  const { handleSubmit, errors, register } = formControl;
  const { setLoggedIn } = useAuthentication();
  const { setNotification } = useNotification();

  const submit = async (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const res = await login(data);

    if (res.error) {
      setNotification(`Login failed: ${res.error.response.data.message}`, 'error');

      return;
    }

    setLoggedIn(true);
    setNotification('You were logged in!', 'success', true);
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
        <FormControlLabel
          control={<Checkbox name="remember" inputRef={register} />}
          label="Stay logged in for 30 days."
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
