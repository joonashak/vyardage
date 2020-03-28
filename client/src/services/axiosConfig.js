/**
 * Axios configuration.
 * `withCredentials: true` is required if backend and UI run at different ports in dev.
 */
export default { withCredentials: process.env.NODE_ENV === 'development' };
