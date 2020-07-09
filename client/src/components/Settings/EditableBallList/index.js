import React, { useState } from 'react';
import { List, Button, Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BallListItem from './BallListItem';
import BallPropertiesDialog from './BallPropertiesDialog';
import useData from '../../../context/useData';


export default () => {
  const { balls } = useData();
  const [dialog, setDialog] = useState(false);

  const sortedBalls = () => balls.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <List style={{ width: '100%' }}>
          {sortedBalls().map((ball) => <BallListItem ball={ball} key={`ball-properties-${ball.id}`} />)}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          onClick={() => setDialog(true)}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddCircleIcon />}
          fullWidth
          data-cy="add-ball-button"
        >
          Add New Ball
        </Button>
        <BallPropertiesDialog open={dialog} onClose={() => setDialog(false)} />
      </Grid>
    </Grid>
  );
};
