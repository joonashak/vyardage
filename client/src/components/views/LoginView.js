import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import Header from '../Header';


export default () => {
  const { handleSubmit, control, errors } = useForm({ mode: 'onBlur' });

  return (
    <>
      <Header />
      Login view.
      <form>
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
        />
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
        />
        <Button onClick={handleSubmit((data) => console.log(data))}>
          Log In
        </Button>
      </form>
    </>
  );
};
