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
