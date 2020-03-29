import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default () => (
  <Button
    color="primary"
    component={Link}
    to="/login"
    variant="contained"
  >
    Login
  </Button>
);
