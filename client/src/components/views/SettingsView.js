import React, { useState } from 'react';
import {
  Typography, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Dialog, DialogContent,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ViewWrapper from './ViewWrapper';
import LoadingIndicator from '../misc/LoadingIndicator';
import EditableBallList from '../EditableBallList';
import EditableClubList from '../EditableClubList';


export default () => {
  const [isLoaded, setLoaded] = useState({ balls: false, clubs: false });

  const loaded = (key) => {
    setLoaded((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <ViewWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Settings
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="ball-list"
            >
              <Typography variant="h6" gutterBottom>
                Balls
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <EditableBallList loaded={() => loaded('balls')} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>

        <Grid item xs={12}>
          <ExpansionPanel expanded>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="club-list"
            >
              <Typography variant="h6" gutterBottom>
                Clubs
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <EditableClubList loaded={() => loaded('clubs')} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>

      <Dialog open={!Object.values(isLoaded).every(Boolean)} fullWidth>
        <DialogContent style={{ overflow: 'hidden' }}>
          <LoadingIndicator text="Loading game data..." />
        </DialogContent>
      </Dialog>
    </ViewWrapper>
  );
};
