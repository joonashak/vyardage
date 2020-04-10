import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, InputAdornment } from '@material-ui/core';


const NumberField = (props) => (<TextField type="number" pattern="[0-9]*" inputProps={{pattern: '[0-9]*'}} {...props} />);

export default ({
  formControl, name, label, rules, children, unit, ...rest
}) => {
  const { control, errors } = formControl;

  const inputProps = unit ? {
    endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
  } : null;

  return (
    <Controller
      as={NumberField}
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
