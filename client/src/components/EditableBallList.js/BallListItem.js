import React, { useState } from 'react';
import {
  Typography, ListItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid, IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BallDetails from './BallDetails';


export default ({ ball }) => {
  const [editing, setEditing] = useState(false);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="ball-list"
      >
        <Typography variant="body1" gutterBottom>
          {ball.name}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <BallDetails ball={ball} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
