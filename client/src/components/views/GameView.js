import React, { useEffect } from 'react';
import ViewWrapper from './ViewWrapper';
import LoadingIndicator from '../misc/LoadingIndicator';
import RegisterShot from '../forms/RegisterShot';
import useData from '../../context/useData';


export default () => {
  const { loading, loadData } = useData();

  useEffect(() => {
    (async () => loadData())();
  }, [loadData]);

  return (
    <ViewWrapper>
      {!loading
        ? (
          <RegisterShot />
        )
        : (
          <ViewWrapper>
            <LoadingIndicator text="Loading game data..." />
          </ViewWrapper>
        )}
    </ViewWrapper>
  );
};
