import api from './api';


/**
 * Fetch all balls from API.
 */
export const getBalls = async () => {
  try {
    const result = await api.get('balls');
    return result.data;
  } catch (error) {
    return { error };
  }
};

/**
 * Create new ball and return it.
 * @param {} data Ball data.
 */
export const addBall = async (data) => {
  try {
    const result = await api.post('ball', data);
    return result.data;
  } catch (error) {
    return { error };
  }
};
