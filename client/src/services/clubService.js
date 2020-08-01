import api from './api';


/* eslint-disable import/prefer-default-export */
/**
 * Fetch all clubs from API.
 */
export const getClubs = async () => {
  try {
    const result = await api.get('clubs');
    return result.data;
  } catch (error) {
    return { error };
  }
};

/**
 * Create new club and return it.
 * @param {} data Club data.
 */
export const saveClub = async (data) => {
  try {
    const result = await api.post('club', data);
    return result.data;
  } catch (error) {
    return { error };
  }
};

/**
 * Update a club and return it.
 * @param {} data Club data, all fields must be supplied.
 */
export const updateClub = async (data) => {
  try {
    const result = await api.put('club', data);
    return result.data;
  } catch (error) {
    return { error };
  }
};

export const removeClub = async (id) => {
  try {
    const result = await api.remove('club', { id });
    return result.data;
  } catch (error) {
    return { error };
  }
};

/**
 * Fetch all possible club types.
 */
export const getClubTypes = async () => {
  try {
    const result = await api.get('clubTypes');
    return result.data;
  } catch (error) {
    return { error };
  }
};
