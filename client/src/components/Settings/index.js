import React from 'react';
import {
  Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditableBallList from './EditableBallList';
import EditableClubList from './EditableClubList';


export default () => (
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
          <EditableBallList />
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
          <EditableClubList loaded={() => {}} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
  </Grid>
);
