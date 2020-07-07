import React, { useState } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BallPropertiesDialog from './BallPropertiesDialog';
import { removeBall } from '../../services/ballService';
import useNotification from '../GlobalNotification/useNotification';


export default ({ ball, upsertBall, setBalls }) => {
  // TODO: Add confirmation to delete.
  const [editing, setEditing] = useState(false);
  const { setNotification } = useNotification();

  const deleteBall = async () => {
    const res = await removeBall(ball.id);

    if (res.error) {
      setNotification(`Removing ball failed: ${res.error.response && res.error.response.data.message}`, 'error');
      return;
    }

    setNotification('Ball removed!', 'success', true);
    setBalls((prev) => prev.filter((b) => b.id !== ball.id));
  };

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
          <IconButton color="secondary" onClick={deleteBall}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <BallPropertiesDialog
        ball={ball}
        open={editing}
        upsertBall={upsertBall}
        setBalls={setBalls}
        onClose={() => setEditing(false)}
      />
    </Grid>
  );
};
