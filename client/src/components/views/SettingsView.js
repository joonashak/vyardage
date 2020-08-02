import React, { useEffect } from 'react';
import ViewWrapper from './ViewWrapper';
import Settings from '../Settings';
import useData from '../../context/useData';


export default () => {
  const { loadData } = useData();

  useEffect(() => {
    (async () => loadData())();
  }, [loadData]);

  return (
    <ViewWrapper loadingMessage="Loading game data...">
      <Settings />
    </ViewWrapper>
  );
};
