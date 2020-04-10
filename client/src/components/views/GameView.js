import React, { useState, useEffect } from 'react';
import ViewWrapper from './ViewWrapper';
import { getClubs } from '../../services/clubService';
import LoadingIndicator from '../misc/LoadingIndicator';
import SelectEquipment from '../SelectEquipment';
import { getBalls } from '../../services/ballService';
import RegisterShot from '../forms/RegisterShot';


export default () => {
  const [gameData, setGameData] = useState({});
  const [isLoaded, setLoaded] = useState(false);
  const [selectionReady, setSelectionReady] = useState(false);

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

  const setEquipment = (equipment) => {
    setGameData((prev) => ({ equipment, ...prev }));
    setSelectionReady(true);
  };

  // Loading screen.
  if (!isLoaded) {
    return (
      <ViewWrapper>
        <LoadingIndicator text="Loading game data..." />
      </ViewWrapper>
    );
  }

  return (
    <ViewWrapper>
      {selectionReady
        ? <RegisterShot gameData={gameData} />
        : <SelectEquipment gameData={gameData} setEquipment={setEquipment} />}
    </ViewWrapper>
  );
};
