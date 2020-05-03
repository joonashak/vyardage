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
export const saveBall = async (data) => {
  try {
    const result = await api.post('ball', data);
    return result.data;
  } catch (error) {
    return { error };
  }
};

/**
 * Update a ball and return it.
 * @param {} data Ball data, all fields must be supplied.
 */
export const updateBall = async (data) => {
  try {
    const result = await api.put('ball', data);
    return result.data;
  } catch (error) {
    return { error };
  }
};

export const removeBall = async (id) => {
  try {
    const result = await api.remove('ball', { id });
    return result.data;
  } catch (error) {
    return { error };
  }
};
