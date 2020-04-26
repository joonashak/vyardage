import api from './api';


/* eslint-disable import/prefer-default-export */
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
