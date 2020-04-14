import React, { useState, useEffect } from 'react';
import ViewWrapper from './ViewWrapper';
import { getClubs, getClubTypes } from '../../services/clubService';
import LoadingIndicator from '../misc/LoadingIndicator';
import { getBalls } from '../../services/ballService';
import RegisterShot from '../forms/RegisterShot';


export default () => {
  const [gameData, setGameData] = useState({});
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const asyncFetch = async () => {
      // Fetch game data from the API.
      const clubs = await getClubs();
      const clubTypes = await getClubTypes();
      const balls = await getBalls();

      // Read past equipment selections from browser local storage.
      const equipment = {};
      const ballId = localStorage.getItem('vyardage.equipment.ballId');
      equipment.ball = balls.find((b) => b.id === ballId);

      clubTypes.forEach((clubType) => {
        const clubId = localStorage.getItem(`vyardage.equipment.${clubType}`);
        equipment[clubType] = clubs.find((c) => c.id === clubId);
      });

      setGameData({
        clubs,
        clubTypes,
        balls,
        savedEquipment: equipment,
      });

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
