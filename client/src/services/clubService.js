import axios from 'axios';
import config from './axiosConfig';


const url = process.env.REACT_APP_API_URL;

/* eslint-disable import/prefer-default-export */
/**
 * Fetch all clubs from API.
 */
export const getClubs = async () => {
  try {
    const result = await axios.get(`${url}/clubs`, config());
    return result.data;
  } catch (error) {
    return { error };
  }
};
