import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, MenuItem } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useStore } from 'react-hookstore';
import { save as saveShot } from '../../services/shotService';
import ControlledInput from './ControlledInput';
import NumberField from './NumberField';
import EnvironmentInput from './EnvironmentInput';
import SwingInput from './SwingInput';


export default ({ gameData }) => {
  const formControl = useForm({ mode: 'onBlur' });
  const { handleSubmit, errors } = formControl;
  const [, setNotification] = useStore('globalNotification');

  const submit = async (data) => {
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
      <EnvironmentInput formControl={formControl} />

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

      <SwingInput formControl={formControl} />

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
