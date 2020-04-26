import api from './api';


/**
 * Attempt a login with given credentials.
 * @param {object} data
 */
export const login = async (data) => {
  try {
    const result = await api.post('login', data);
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
    return await api.get('logout');
  } catch (error) {
    return { error };
  }
};

/**
 * Check if the current session is still valid.
 */
export const checkSession = async () => {
  try {
    return await api.get('checkSession');
  } catch (error) {
    return { error };
  }
};
