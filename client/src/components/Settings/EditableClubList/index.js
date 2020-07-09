import React, { useState, useEffect } from 'react';
import {
  List, useTheme, useMediaQuery, Button, Grid,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { getClubTypes } from '../../../services/clubService';


export default ({ loaded }) => {
  const [clubTypes, setClubTypes] = useState([]);
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const asyncFetch = async () => {
      setClubTypes(await getClubTypes());
      loaded();
    };

    asyncFetch();
  }, []);

  return (
    <Grid container spacing={3}>
      {clubTypes.map((clubType) => (
        <Grid item xs={12} md={6}>
          {clubType}
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
