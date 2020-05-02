import React from 'react';
import {
  List, ListItem, Typography, useTheme, useMediaQuery,
} from '@material-ui/core';
import BallPropertiesForm from './BallPropertiesForm';
import BallListItem from './BallListItem';


export default ({ balls }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <List style={{ width: '100%' }}>
      {balls.map((ball) => <BallListItem ball={ball} key={`ball-properties-${ball.id}`} />)}
      <ListItem>
        <Typography variant="h6" gutterBottom>
          Add New Ball:
          {mobile ? 'mobile' : 'not mobile'}
        </Typography>
      </ListItem>
      <ListItem>
        <BallPropertiesForm />
      </ListItem>
    </List>
  );
};
