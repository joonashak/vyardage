import React, { useState } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BallPropertiesDialog from './BallPropertiesDialog';


export default ({ ball, upsertBall }) => {
  const [editing, setEditing] = useState(false);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="body2" gutterBottom>
          Distance:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2" gutterBottom>
          {ball.distance}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2" gutterBottom>
          Spin:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2" gutterBottom>
          {ball.spin}
        </Typography>
      </Grid>
      <Grid container justify="flex-end">
        <Grid item>
          <IconButton onClick={() => setEditing(true)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <BallPropertiesDialog
        ball={ball}
        open={editing}
        upsertBall={upsertBall}
        onClose={() => setEditing(false)}
      />
    </Grid>
  );
};
