import React, { useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab';
import {
  TextField, Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default ({ gameData, equipment, setEquipment }) => {
  const { balls } = gameData;

  useEffect(() => {
    const ballId = localStorage.getItem('vyardage.equipment.ballId');
    const ball = balls.find((b) => b.id === ballId);
    setEquipment({ ball });
  }, [balls, setEquipment]);

  const setBall = (ball) => {
    localStorage.setItem('vyardage.equipment.ballId', ball.id);
    setEquipment({ ball });
  };

  return (
    <Grid item xs={12}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="select-equipment"
          data-cy="select-equipment"
        >
          <Typography variant="h6">
            Select Equipment
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {/* FIXME: Handle empty ball array. */}
          <Autocomplete
            id="select-ball"
            options={balls}
            getOptionLabel={(ball) => ball.name}
            renderInput={(params) => <TextField {...params} label="Ball" variant="outlined" fullWidth />}
            onChange={(_, value) => setBall(value)}
            value={equipment.ball || null}
            data-cy="select-ball"
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
  );
};
