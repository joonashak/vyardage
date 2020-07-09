import React, { useState } from 'react';
import {
  useTheme, useMediaQuery, Button, Grid,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useData from '../../../context/useData';
import ClubTypePanel from './ClubTypePanel';


export default () => {
  const { clubTypes, clubs } = useData();
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container spacing={3}>
      {clubTypes.map((clubType) => (
        <Grid item xs={12} md={6} key={`${clubType}-panel`}>
          <ClubTypePanel
            clubType={clubType}
            clubs={clubs.filter((club) => club.clubType === clubType)}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          type="submit"
          onClick={() => setDialog(true)}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddCircleIcon />}
          fullWidth
          data-cy="add-club-button"
        >
          Add New Club
        </Button>
      </Grid>
    </Grid>
  );
};
