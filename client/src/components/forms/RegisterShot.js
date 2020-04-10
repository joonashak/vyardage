import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, MenuItem } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useStore } from 'react-hookstore';
import { save as saveShot } from '../../services/shotService';
import ControlledInput from './ControlledInput';
import NumberField from './NumberField';


export default ({ gameData }) => {
  const formControl = useForm({ mode: 'onBlur' });
  const { handleSubmit, errors } = formControl;
  const [, setNotification] = useStore('globalNotification');

  const submit = async (data) => {
    console.log(data);
    return;
    if (Object.keys(errors).length > 0) {
      return;
    }

    const shot = data;
    shot.ballId = gameData.equipment.ball.id;
    // Format floats.
    ['liePct', 'spin', 'power'].forEach((key) => { shot[key] /= 100; });
    // Format integers.
    ['windDir', 'windSpeed', 'elevation', 'actCarry']
      .forEach((key) => { shot[key] = Math.round(shot[key]); });

    const res = await saveShot(data);

    if (res.error) {
      setNotification({
        type: 'error',
        message: `Shot entry failed: ${res.error.response.data.message}`,
      });

      return;
    }

    setNotification({ type: 'success', message: 'Shot recorded!', autoHide: true });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ControlledInput
          formControl={formControl}
          name="lieType"
          label="Lie Type"
          rules={{ required: 'Lie Type is required.' }}
          select
          onChange={([event]) => {
            console.log(event.target.value);
            formControl.setValue('liePct', '69');
            console.log(formControl.getValues());
            return event.target.value;
          }}
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
        />
      </Grid>
      <Grid item xs={12}>
        <ControlledInput
          formControl={formControl}
          name="clubId"
          label="Club Selection"
          rules={{ required: 'Club Selection is required.' }}
          select
        >
          {gameData.clubs.map((club) => (
            <MenuItem value={club.id} key={club.id}>{club.clubType}</MenuItem>))}
        </ControlledInput>
      </Grid>
      <Grid item xs={6}>
        <NumberField
          formControl={formControl}
          name="spin"
          label="Spin"
          rules={{
            required: 'Spin is required.',
            min: { value: -100, message: 'Minimum spin is -100.' },
            max: { value: 100, message: 'Maximum spin is 100.' },
          }}
          unit="%"
          signButton
        />
      </Grid>
      <Grid item xs={6}>
        <NumberField
          formControl={formControl}
          name="power"
          label="Power"
          rules={{
            required: 'Power is required.',
            min: { value: 0, message: 'Minimum power is 0.' },
            max: { value: 100, message: 'Maximum power is 100.' },
          }}
          unit="%"
        />
      </Grid>
      <Grid item xs={12}>
        <NumberField
          formControl={formControl}
          name="actCarry"
          label="Carry Distance"
          rules={{
            required: 'Carry distance is required.',
            min: { value: 0, message: 'Minimum carry is 0.' },
            max: { value: 400, message: 'Maximum carry is 400.' },
          }}
          unit="yds"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          onClick={handleSubmit(submit)}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          fullWidth
        >
          Save Shot
        </Button>
      </Grid>
    </Grid>
  );
};
