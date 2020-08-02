import React from 'react';
import {
  Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, makeStyles, Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClubListItem from './ClubListItem';
import AddClubDialog from './AddClubDialog';


const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

export default ({ clubType, clubs }) => {
  const classes = useStyles();

  return (
    <ExpansionPanel data-cy={clubType}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${clubType}-list`}
      >
        <Typography variant="body1">
          {`${clubType}s`}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container>
          <Grid item xs={12}>
            {clubs.length
              ? (
                <List classes={classes}>
                  {clubs.map((club) => <ClubListItem club={club} key={club.id} />)}
                </List>
              )
              : `No ${clubType.toLowerCase()}s found.`}
          </Grid>

          <Grid item xs={12}>
            <AddClubDialog clubType={clubType} />
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
