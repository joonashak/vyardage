import React from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import ExposureIcon from '@material-ui/icons/Exposure';
import ControlledInput from './ControlledInput';


export default ({
  formControl, name, signButton, unit, ...rest
}) => {
  const toggleSign = () => {
    formControl.setValue(name, formControl.getValues()[name] * -1);
  };

  const inputProps = {};

  // Toggle sign button.
  if (signButton) {
    inputProps.startAdornment = (
      <InputAdornment position="start">
        <IconButton edge="start" onClick={toggleSign}>
          <ExposureIcon color="secondary" />
        </IconButton>
      </InputAdornment>
    );
  }

  // Unit denomination.
  if (unit) {
    inputProps.endAdornment = <InputAdornment position="end">{unit}</InputAdornment>;
  }

  return (
    <ControlledInput
      as={<TextField inputProps={{ pattern: '[0-9]*' }} />}
      type="number"
      formControl={formControl}
      name={name}
      InputProps={inputProps}
      {...rest}
    />
  );
};
