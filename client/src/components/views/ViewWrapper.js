import React from 'react';
import { Container, Dialog, DialogContent } from '@material-ui/core';
import Header from '../Header';
import useData from '../../context/useData';
import LoadingIndicator from '../misc/LoadingIndicator';


export default ({ children, loadingMessage }) => {
  const { loading } = useData();

  return (
    <>
      <Header />
      <Container maxWidth="md">
        {children}
        {loading && loadingMessage
          ? (
            <Dialog open fullWidth>
              <DialogContent style={{ overflow: 'hidden' }}>
                <LoadingIndicator text={loadingMessage} />
              </DialogContent>
            </Dialog>
          )
          : null}
      </Container>
    </>
  );
};
