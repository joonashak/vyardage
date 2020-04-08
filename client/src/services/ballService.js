import axios from 'axios';
import config from './axiosConfig';


const url = process.env.REACT_APP_API_URL;

/* eslint-disable import/prefer-default-export */
/**
 * Fetch all balls from API.
 */
export const getBalls = async () => {
  try {
    const result = await axios.get(`${url}/balls`, config);
    return result.data;
  } catch (error) {
    return { error };
  }
};
