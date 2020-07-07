import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button, Grid, MenuItem, Typography,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { save as saveShot } from '../../services/shotService';
import ControlledInput from './ControlledInput';
import EnvironmentInput from './EnvironmentInput';
import SwingInput from './SwingInput';
import SelectEquipment from './SelectEquipment';
import useNotification from '../GlobalNotification/useNotification';


export default ({ gameData }) => {
  const [equipment, setEquipment] = useState(gameData.savedEquipment);
  const formControl = useForm({ mode: 'onBlur' });
  const { handleSubmit, errors, setValue } = formControl;
  const { setNotification } = useNotification();
  const scrollRef = React.createRef();

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
      setNotification(`Shot entry failed: ${res.error.response && res.error.response.data.message}`, 'error');
      return;
    }

    setNotification('Shot recorded!', 'success', true);
    clearForm();
  };

  /**
   * Get active clubs in the enumeration order.
   */
  const getActiveClubs = () => {
    const activeKeys = gameData.clubTypes.filter((clubType) => equipment[clubType]);
    return activeKeys.map((clubType) => equipment[clubType]);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <SelectEquipment gameData={gameData} equipment={equipment} setEquipment={setEquipment} />

      <Grid item xs={12}>
        <Typography variant="h6" innerRef={scrollRef}>
          Shot Details
        </Typography>
      </Grid>

      <EnvironmentInput formControl={formControl} />

      <Grid item xs={12}>
        <ControlledInput
          formControl={formControl}
          name="clubId"
          label="Club Selection"
          rules={{ required: 'Club Selection is required.' }}
          select
        >
          {getActiveClubs().map((club) => (
            <MenuItem value={club.id} key={club.id} data-cy={`club-option-${club.clubType}`}>{club.clubType}</MenuItem>))}
        </ControlledInput>
      </Grid>

      <SwingInput formControl={formControl} />

      <Grid item xs={12}>
        <Button
          type="submit"
          onClick={() => {
            handleSubmit(submit)();
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
          }}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          fullWidth
          data-cy="save-shot-button"
        >
          Save Shot
        </Button>
      </Grid>
    </Grid>
  );
};
