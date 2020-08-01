import { updateClub, saveClub, removeClub } from '../../services/clubService';


export default (state, setState) => {
  const upsertClub = async (ball) => {
    const { id, ...newBall } = ball;
    const res = state.clubs.find((b) => b.id === id)
      ? await updateClub({ id, ...newBall }) : await saveClub(newBall);

    if (res.error) {
      throw res.error;
    }

    setState((prev) => {
      const clubs = prev.clubs.filter((b) => b.id !== res.id).concat(res);
      return { ...prev, clubs };
    });

    return res;
  };

  const deleteClub = async (ball) => {
    const res = await removeClub(ball.id);

    if (res.error) {
      throw res.error;
    }

    setState((prev) => ({ ...prev, clubs: prev.clubs.filter((b) => b.id !== ball.id) }));
  };

  const { clubs, clubTypes } = state;
  return {
    clubs, clubTypes, upsertClub, deleteClub,
  };
};
