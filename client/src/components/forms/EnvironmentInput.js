import React from 'react';
import { Grid, MenuItem } from '@material-ui/core';
import ControlledInput from './ControlledInput';
import NumberField from './NumberField';


export default ({ formControl }) => {
  const ref = React.useRef();
  return (
    <>
      <Grid item xs={6}>
        <ControlledInput
          formControl={formControl}
          name="lieType"
          label="Lie Type"
          rules={{ required: 'Lie Type is required.' }}
          select
          SelectProps={{ MenuProps: { onExited: () => ref.current.focus() } }}
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
          rules={{ required: 'Lie % is required.' }}
          defaultValue="100"
          unit="%"
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
          inputRef={ref}
        />
      </Grid>
    </>
  );
};
