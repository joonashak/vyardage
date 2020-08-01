import React from 'react';
import {
  Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClubListItem from './ClubListItem';


const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

export default ({ clubType, clubs }) => {
  const classes = useStyles();

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${clubType}-list`}
      >
        <Typography variant="body1">
          {clubType}s
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List classes={classes}>
          {clubs.map((club) => <ClubListItem club={club} key={club.id} />)}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
