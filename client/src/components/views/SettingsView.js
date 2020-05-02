import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ViewWrapper from './ViewWrapper';
import { getBalls } from '../../services/ballService';
import LoadingIndicator from '../misc/LoadingIndicator';
import EditableBallList from '../EditableBallList.js';


export default () => {
  const [balls, setBalls] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const asyncFetch = async () => {
      setBalls(await getBalls());
      setLoaded(true);
    };

    asyncFetch();
  }, []);

  if (!isLoaded) {
    return (
      <ViewWrapper>
        <LoadingIndicator text="Loading game data..." />
      </ViewWrapper>
    );
  }

  return (
    <ViewWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Settings
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <ExpansionPanel expanded>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="ball-list"
            >
              <Typography variant="h6" gutterBottom>
                Balls
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <EditableBallList balls={balls} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Clubs
          </Typography>
        </Grid>
      </Grid>
    </ViewWrapper>
  );
};
