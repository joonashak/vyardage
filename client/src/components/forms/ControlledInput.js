import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';


export default ({
  formControl, name, children, ...rest
}) => {
  const { control, errors } = formControl;

  return (
    <Controller
      as={TextField}
      name={name}
      id={name}
      control={control}
      error={!!errors[name]}
      helperText={errors[name] && errors[name].message}
      defaultValue=""
      variant="filled"
      fullWidth
      data-cy={`input-${name}`}
      {...rest}
    >
      {children}
    </Controller>
  );
};
