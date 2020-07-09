import React, { useEffect } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import ViewWrapper from './ViewWrapper';
import LoadingIndicator from '../misc/LoadingIndicator';
import Settings from '../Settings';
import useData from '../../context/useData';


export default () => {
  const { loading, loadData } = useData();

  useEffect(() => {
    (async () => loadData())();
  }, [loadData]);

  return (
    <ViewWrapper>
      <Settings />

      <Dialog open={loading} fullWidth>
        <DialogContent style={{ overflow: 'hidden' }}>
          <LoadingIndicator text="Loading game data..." />
        </DialogContent>
      </Dialog>
    </ViewWrapper>
  );
};
