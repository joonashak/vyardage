import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';


const LoginButton = ({ history }) => (
  <Button onClick={() => history.push('/login')}>
    Log In
  </Button>
);

export default withRouter(LoginButton);
