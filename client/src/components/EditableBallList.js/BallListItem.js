import React from 'react';
import {
  Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BallDetails from './BallDetails';


export default ({ ball, upsertBall }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="ball-list"
    >
      <Typography variant="body1">
        {ball.name}
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <BallDetails ball={ball} upsertBall={upsertBall} />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);
