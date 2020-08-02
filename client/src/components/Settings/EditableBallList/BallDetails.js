import React, { useState } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BallPropertiesDialog from './BallPropertiesDialog';
import useNotification from '../../GlobalNotification/useNotification';
import useData from '../../../context/useData';


export default ({ ball }) => {
  // TODO: Add confirmation to delete.
  const [editing, setEditing] = useState(false);
  const { deleteBall } = useData();
  const { setNotification } = useNotification();

  const remove = async () => {
    try {
      await deleteBall(ball);
      setNotification('Ball removed!', 'success', true);
    } catch (error) {
      setNotification(`Removing ball failed: ${error.response && error.response.data.message}`, 'error');
    }
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
          <IconButton onClick={() => setEditing(true)} data-cy={`edit-${ball.name}`}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={remove} data-cy={`delete-${ball.name}`}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <BallPropertiesDialog
        ball={ball}
        open={editing}
        onClose={() => setEditing(false)}
      />
    </Grid>
  );
};
