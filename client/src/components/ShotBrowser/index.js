import React, { useState } from 'react';
import ClubSelection from './ClubSelection';

import { getShotsByClub } from '../../services/shotService';
import ShotTable from './ShotTable';


export default () => {
  const [selectedClub, setSelectedClub] = useState('');
  // TODO: Move this to useData and cache.
  const [shots, setShots] = useState([]);

  const changeClub = async (id) => {
    setSelectedClub(id);
    setShots(await getShotsByClub(id));
  };

  return (
    <>
      <ClubSelection selectedClub={selectedClub} setSelectedClub={changeClub} />
      <ShotTable shots={shots} />
    </>
  );
};
