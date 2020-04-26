import api from './api';


/* eslint-disable import/prefer-default-export */
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
