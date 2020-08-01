import { updateClub, saveClub, removeClub } from '../../services/clubService';


export default (state, setState) => {
  const upsertClub = async (club) => {
    const { id, ...newClub } = club;
    const res = state.clubs.find((b) => b.id === id)
      ? await updateClub({ id, ...newClub }) : await saveClub(newClub);

    if (res.error) {
      throw res.error;
    }

    setState((prev) => {
      const clubs = prev.clubs.filter((b) => b.id !== res.id).concat(res);
      return { ...prev, clubs };
    });

    return res;
  };

  const deleteClub = async (club) => {
    const res = await removeClub(club.id);

    if (res.error) {
      throw res.error;
    }

    setState((prev) => ({ ...prev, clubs: prev.clubs.filter((b) => b.id !== club.id) }));
  };

  const { clubs, clubTypes } = state;
  return {
    clubs, clubTypes, upsertClub, deleteClub,
  };
};
