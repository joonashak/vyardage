import React, { useState, useEffect } from 'react';
import ViewWrapper from './ViewWrapper';
import { getClubs } from '../../services/clubService';
import LoadingIndicator from '../misc/LoadingIndicator';
import { getBalls } from '../../services/ballService';
import RegisterShot from '../forms/RegisterShot';


export default () => {
  const [gameData, setGameData] = useState({});
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const asyncFetch = async () => {
      const data = {
        clubs: await getClubs(),
        balls: await getBalls(),
      };
      setGameData(data);
      setLoaded(true);
    };
    asyncFetch();
  }, []);

  return (
    <ViewWrapper>
      {isLoaded
        ? <RegisterShot gameData={gameData} />
        : (
          <ViewWrapper>
            <LoadingIndicator text="Loading game data..." />
          </ViewWrapper>
        )}
    </ViewWrapper>
  );
};
