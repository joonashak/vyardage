import React from 'react';
import {
  Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, makeStyles, Button, Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddCircleIcon />}
              fullWidth
              data-cy="add-club-button"
            >
              {`Add ${clubType}`}
            </Button>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
