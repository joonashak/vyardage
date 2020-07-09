import React from 'react';
import {
  Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default ({ clubType, clubs }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${clubType}-list`}
    >
      <Typography variant="body1">
        {clubType}
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      {clubs.map((club) => club.name)}
    </ExpansionPanelDetails>
  </ExpansionPanel>
);
