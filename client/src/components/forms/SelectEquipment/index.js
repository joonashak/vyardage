import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import {
  TextField, Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button, Chip, makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import SelectClubs from './SelectClubs';


const useStyles = makeStyles(() => ({
  content: {
    alignItems: 'center',
  },
}));

export default ({ gameData, equipment, setEquipment }) => {
  const { balls } = gameData;
  const classes = useStyles();

  const selectionOk = () => {
    const selectedClubs = gameData.clubTypes.map((type) => equipment[type]);
    return equipment.ball && selectedClubs.find((club) => !!club);
  };

  const [expanded, setExpanded] = useState(!selectionOk());

  const setBall = (ball) => {
    localStorage.setItem('vyardage.equipment.ballId', ball.id);
    setEquipment((prev) => ({ ...prev, ball }));
  };

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <Grid item xs={12}>
      <ExpansionPanel expanded={expanded} onChange={toggleExpanded}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="select-equipment"
          data-cy="select-equipment"
          classes={classes}
        >
          <Typography variant="h6" component="span">
            Select Equipment
          </Typography>
          {/* TODO: Needs better styling. */}
          {equipment.ball ? null
            : (
              <Chip
                label="Not Completed"
                color="secondary"
                style={{ marginLeft: '1rem' }}
              />
            )}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {/* FIXME: Handle empty ball array. */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Choose the equipment used when playing.
              </Typography>
              <Typography variant="body2">
                <i>Choices are remembered on this device.</i>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="select-ball"
                options={balls}
                getOptionLabel={(ball) => ball.name}
                renderInput={(params) => <TextField {...params} label="Ball" variant="outlined" fullWidth />}
                onChange={(_, value) => setBall(value)}
                value={equipment.ball || null}
                data-cy="select-ball"
              />
            </Grid>

            <SelectClubs gameData={gameData} equipment={equipment} setEquipment={setEquipment} />

            <Grid item xs={false} md={6} />
            <Grid item xs={false} md={8} />

            <Grid container justify="flex-end">
              <Grid item>
                <Button
                  type="submit"
                  onClick={toggleExpanded}
                  variant="outlined"
                  size="large"
                  startIcon={<CloseIcon />}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
  );
};
