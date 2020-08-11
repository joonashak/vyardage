import React, { useEffect } from 'react';
import ViewWrapper from './ViewWrapper';
import useData from '../../context/useData';
import ShotEntry from '../ShotEntry';


export default () => {
  const { loadData } = useData();

  useEffect(() => {
    (async () => loadData())();
  }, [loadData]);

  return (
    <ViewWrapper loadingMessage="Loading game data...">
      <ShotEntry />
    </ViewWrapper>
  );
};
