import React, {
  useContext, createContext, useState, useCallback,
} from 'react';
import { getBalls } from '../services/ballService';
import { getClubTypes, getClubs } from '../services/clubService';
import ballActions from './actions/ballActions';
import clubActions from './actions/clubActions';


const defaultState = {
  loading: true,
  balls: [],
  clubs: [],
  clubTypes: [],
  equipment: {},
};

const DataContext = createContext([[], () => {}]);

export const DataProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);

  return (
    <DataContext.Provider value={[state, setState]}>
      {children}
    </DataContext.Provider>
  );
};

export default () => {
  const [state, setState] = useContext(DataContext);

  const setEquipment = (eq) => setState(
    (prev) => ({ ...prev, equipment: { ...prev.equipment, ...eq } }),
  );

  const loadData = useCallback(async () => {
    const balls = await getBalls();
    const clubTypes = await getClubTypes();
    const clubs = await getClubs();

    // Read past equipment selections from browser local storage.
    const equipment = {};
    const ballId = localStorage.getItem('vyardage.equipment.ballId');
    equipment.ball = balls.find((b) => b.id === ballId);

    clubTypes.forEach((clubType) => {
      const clubId = localStorage.getItem(`vyardage.equipment.${clubType}`);
      equipment[clubType] = clubs.find((c) => c.id === clubId);
    });

    setState({
      loading: false,
      balls,
      clubs,
      clubTypes,
      equipment,
    });
  }, [setState]);

  const { loading, equipment } = state;

  return {
    ...ballActions(state, setState),
    ...clubActions(state, setState),
    loading,
    equipment,
    loadData,
    setEquipment,
  };
};
