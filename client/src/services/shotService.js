import axios from 'axios';
import config from './axiosConfig';


const url = process.env.REACT_APP_API_URL;

/* eslint-disable import/prefer-default-export */
/**
 * Save new shot in API.
 * @param {object} data Shot data.
 */
export const save = async (data) => {
  try {
    const result = await axios.post(`${url}/shot`, data, config);
    return result.data;
  } catch (error) {
    return { error };
  }
};
