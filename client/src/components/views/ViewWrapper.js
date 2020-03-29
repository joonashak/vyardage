import React from 'react';
import { Container } from '@material-ui/core';
import Header from '../Header';


export default ({ children }) => (
  <>
    <Header />
    <Container maxWidth="md">
      {children}
    </Container>
  </>
);
