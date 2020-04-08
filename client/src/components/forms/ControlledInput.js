import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, InputAdornment } from '@material-ui/core';


export default ({
  formControl, name, label, rules, children, unit, ...rest
}) => {
  const { control, errors } = formControl;

  const inputProps = unit ? {
    endAdornment: <InputAdornment position="end">{unit}</InputAdornment>
  } : null;

  return (
    <Controller
      as={TextField}
      name={name}
      id={name}
      control={control}
      label={label}
      rules={rules}
      error={!!errors[name]}
      helperText={errors[name] && errors[name].message}
      InputProps={inputProps}
      defaultValue=""
      variant="filled"
      fullWidth
      {...rest}
    >
      {children}
    </Controller>
  );
};
