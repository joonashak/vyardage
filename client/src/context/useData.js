import React, {
  useContext, createContext, useState, useCallback,
} from 'react';
import {
  getBalls, updateBall, saveBall, removeBall,
} from '../services/ballService';
import { getClubTypes, getClubs } from '../services/clubService';


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

  const upsertBall = async (ball) => {
    const { id, ...newBall } = ball;
    const res = state.balls.find((b) => b.id === id)
      ? await updateBall({ id, ...newBall }) : await saveBall(newBall);

    if (res.error) {
      throw res.error;
    }

    setState((prev) => {
      const balls = prev.balls.filter((b) => b.id !== res.id).concat(res);
      return { ...prev, balls };
    });

    return res;
  };

  const deleteBall = async (ball) => {
    const res = await removeBall(ball.id);

    if (res.error) {
      throw res.error;
    }

    setState((prev) => ({ ...prev, balls: prev.balls.filter((b) => b.id !== ball.id) }));
  };

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

  const {
    loading, balls, clubs, clubTypes, equipment,
  } = state;

  return {
    loading,
    balls,
    clubs,
    clubTypes,
    equipment,
    loadData,
    upsertBall,
    deleteBall,
    setEquipment,
  };
};
