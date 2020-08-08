import api from './api';


/**
 * Save new shot in API.
 * @param {object} data Shot data.
 */
export const save = async (data) => {
  try {
    const result = await api.post('shot', data);
    return result.data;
  } catch (error) {
    return { error };
  }
};

/**
 * Get all shots for a given club.
 * @param {string} id Club ID.
 */
export const getShotsByClub = async (id) => {
  try {
    const result = await api.get('shotsByClub', { id });
    return result.data;
  } catch (error) {
    return { error };
  }
};
