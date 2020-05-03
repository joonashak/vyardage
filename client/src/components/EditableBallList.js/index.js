import React, { useState } from 'react';
import {
  List, ListItem, Typography, useTheme, useMediaQuery, Button,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BallListItem from './BallListItem';
import BallPropertiesDialog from './BallPropertiesDialog';


export default ({ balls }) => {
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <List style={{ width: '100%' }}>
      {balls.map((ball) => <BallListItem ball={ball} key={`ball-properties-${ball.id}`} />)}
      <ListItem>
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
      </ListItem>
    </List>
  );
};
