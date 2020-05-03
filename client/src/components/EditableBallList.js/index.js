import React, { useState, useEffect } from 'react';
import {
  List, useTheme, useMediaQuery, Button, Grid,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BallListItem from './BallListItem';
import BallPropertiesDialog from './BallPropertiesDialog';
import { getBalls } from '../../services/ballService';


export default ({ loaded }) => {
  const [balls, setBalls] = useState([]);
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const asyncFetch = async () => {
      setBalls(await getBalls());
      loaded();
    };

    asyncFetch();
  }, []);

  const addBall = (ball) => {
    setBalls((prev) => {
      prev.push(ball);
      return prev;
    });
    setDialog(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <List style={{ width: '100%' }}>
          {balls.map((ball) => <BallListItem ball={ball} key={`ball-properties-${ball.id}`} />)}
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
        <BallPropertiesDialog open={dialog} onClose={addBall} />
      </Grid>
    </Grid>
  );
};
