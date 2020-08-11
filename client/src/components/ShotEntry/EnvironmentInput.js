import React from 'react';
import { Grid, MenuItem } from '@material-ui/core';
import ControlledInput from '../forms/ControlledInput';
import NumberField from '../forms/NumberField';


export default ({ formControl }) => {
  const liePctRef = React.useRef();
  const windDirRef = React.useRef();

  const handleLieType = () => {
    if (['Tee', 'Fairway'].includes(formControl.getValues().lieType)) {
      formControl.setValue('liePct', 100);
      windDirRef.current.select();
      return;
    }

    liePctRef.current.select();
  };

  return (
    <>
      <Grid item xs={6}>
        <ControlledInput
          formControl={formControl}
          name="lieType"
          label="Lie Type"
          rules={{ required: 'Lie Type is required.' }}
          select
          SelectProps={{ MenuProps: { onExited: handleLieType } }}
          defaultValue="Fairway"
        >
          <MenuItem value="Tee">Tee</MenuItem>
          <MenuItem value="Fairway">Fairway</MenuItem>
          <MenuItem value="Rough">Rough</MenuItem>
          <MenuItem value="Sand">Sand</MenuItem>
        </ControlledInput>
      </Grid>
      <Grid item xs={6}>
        <NumberField
          formControl={formControl}
          name="liePct"
          label="Lie %"
          rules={{
            required: 'Lie % is required.',
            min: { value: 0, message: 'Minimum value is 0%.' },
            max: { value: 100, message: 'Maximum value is 100%.' },
          }}
          defaultValue="100"
          unit="%"
          inputRef={liePctRef}
        />
      </Grid>
      <Grid item xs={6}>
        <NumberField
          formControl={formControl}
          name="windDir"
          label="Wind Direction"
          rules={{
            required: 'Wind Direction is required.',
            min: { value: 0, message: 'Direction cannot be negative.' },
            max: { value: 359, message: 'Maximum value is 359°.' },
          }}
          unit="deg"
          inputRef={windDirRef}
        />
      </Grid>
      <Grid item xs={6}>
        <NumberField
          formControl={formControl}
          name="windSpeed"
          label="Wind Speed"
          rules={{
            required: 'Wind Speed is required.',
            min: { value: 0, message: 'Speed cannot be negative.' },
            max: { value: 40, message: 'It probably does not blow that fast.' },
          }}
          unit="mph"
        />
      </Grid>
      <Grid item xs={12}>
        <NumberField
          formControl={formControl}
          name="elevation"
          label="Elevation"
          rules={{
            required: 'Elevation is required.',
            min: { value: -300, message: 'Minimum elevation is -300.' },
            max: { value: 300, message: 'Maximum elevation is 300.' },
          }}
          unit="ft"
          signButton
        />
      </Grid>
    </>
  );
};
