import React, { useEffect } from 'react';
import ViewWrapper from './ViewWrapper';
import RegisterShot from '../forms/RegisterShot';
import useData from '../../context/useData';


export default () => {
  const { loadData } = useData();

  useEffect(() => {
    (async () => loadData())();
  }, [loadData]);

  return (
    <ViewWrapper loadingMessage="Loading game data...">
      <RegisterShot />
    </ViewWrapper>
  );
};
