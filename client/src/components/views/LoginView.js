import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import Header from '../Header';
import { login } from '../../services/loginService';


export default () => {
  const { handleSubmit, control, errors } = useForm({ mode: 'onBlur' });

  const submit = async (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const { username, password } = data;
    const res = await login(username, password);
    console.log(res);
  };

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
        <Button onClick={handleSubmit(submit)}>
          Log In
        </Button>
      </form>
    </>
  );
};
