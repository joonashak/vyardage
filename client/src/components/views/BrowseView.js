import React, { useEffect } from 'react';
import ViewWrapper from './ViewWrapper';
import useData from '../../context/useData';
import ShotBrowser from '../ShotBrowser';


export default () => {
  const { loadData } = useData();

  useEffect(() => {
    (async () => loadData())();
  }, [loadData]);

  return (
    <ViewWrapper loadingMessage="Loading data...">
      <ShotBrowser />
    </ViewWrapper>
  );
};
