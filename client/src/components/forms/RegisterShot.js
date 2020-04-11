import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, MenuItem } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useStore } from 'react-hookstore';
import { save as saveShot } from '../../services/shotService';
import ControlledInput from './ControlledInput';
import EnvironmentInput from './EnvironmentInput';
import SwingInput from './SwingInput';
import SelectEquipment from './SelectEquipment';


export default ({ gameData }) => {
  const [equipment, setEquipment] = useState({});
  const formControl = useForm({ mode: 'onBlur' });
  const { handleSubmit, errors, setValue } = formControl;
  const [, setNotification] = useStore('globalNotification');

  const clearForm = () => {
    setValue('lieType', 'Fairway');
    setValue('liePct', 100);
    ['windDir', 'windSpeed', 'elevation', 'clubId', 'spin', 'power', 'actCarry']
      .forEach((key) => setValue(key, ''));
  };

  const submit = async (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const shot = data;
    shot.ballId = equipment.ball.id;
    // Format floats.
    ['liePct', 'spin', 'power'].forEach((key) => { shot[key] /= 100; });
    // Format integers.
    ['windDir', 'windSpeed', 'elevation', 'actCarry']
      .forEach((key) => { shot[key] = Math.round(shot[key]); });

    const res = await saveShot(shot);

    if (res.error) {
      setNotification({
        type: 'error',
        message: `Shot entry failed: ${res.error.response && res.error.response.data.message}`,
      });
      return;
    }

    setNotification({ type: 'success', message: 'Shot recorded!', autoHide: true });
    clearForm();
  };

  return (
    <Grid container spacing={2}>
      <SelectEquipment gameData={gameData} equipment={equipment} setEquipment={setEquipment} />
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
