import Cookies from 'universal-cookie';

/**
 * Axios configuration.
 * `withCredentials: true` is required if backend and UI run at different ports in dev.
 */
export default () => {
  const cookies = new Cookies();

  return {
    withCredentials: process.env.NODE_ENV !== 'production',
    headers: {
      'XSRF-Token': cookies.get('XSRF-Token'),
    },
  };
};
