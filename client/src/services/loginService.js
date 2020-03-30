import axios from 'axios';
import config from './axiosConfig';


const url = process.env.REACT_APP_API_URL;

/**
 * Attempt a login with given credentials.
 * @param {string} username
 * @param {string} password
 */
export const login = async (username, password) => {
  try {
    const result = await axios.post(`${url}/login`, { username, password }, config);
    return result.data;
  } catch (error) {
    return { error };
  }
};

/**
 * Log out.
 */
export const logout = async () => {
  try {
    return await axios.get(`${url}/logout`, config);
  } catch (error) {
    return { error };
  }
};

/**
 * Check if the current session is still valid.
 */
export const checkSession = async () => {
  try {
    return await axios.get(`${url}/checkSession`, config);
  } catch (error) {
    return { error };
  }
}
