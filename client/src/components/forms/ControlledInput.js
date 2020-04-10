import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import ExposureIcon from '@material-ui/icons/Exposure';


// Shows the numpad in mobile devices.
const NumberField = (props) => (<TextField type="number" inputProps={{ pattern: '[0-9]*' }} {...props} />);

export default ({
  formControl, name, label, rules, children, unit, type, ...rest
}) => {
  const { control, errors } = formControl;

 
  const inputProps = unit ? {
    startAdornment: (
      <InputAdornment position="start">
        <IconButton edge="start">
          <ExposureIcon color="secondary" />
        </IconButton>
      </InputAdornment>
    ),
    endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
  } : null;

  return (
    <Controller
      as={type === 'number' ? NumberField : TextField}
      name={name}
      type={type}
      id={name}
      control={control}
      label={label}
      rules={rules}
      error={!!errors[name]}
      helperText={errors[name] && errors[name].message}
      defaultValue=""
      variant="filled"
      fullWidth
      {...rest}
    >
      {children}
    </Controller>
  );
};
