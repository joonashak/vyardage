import React, { useContext, createContext, useState } from 'react';


const defaultState = {
  type: null,
  message: null,
  autoHide: false,
};

const NotificationContext = createContext([[], () => {}]);

export const NotificationProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);

  return (
    <NotificationContext.Provider value={[state, setState]}>
      {children}
    </NotificationContext.Provider>
  );
};

export default () => {
  const [state, setState] = useContext(NotificationContext);

  /**
   * Display a global notification.
   * @param {string} message Notification message shown to the user.
   * @param {string} type One of Material-UI's Alert severity values (`error`, `warning`, `info` or
   * `success`).
   * @param {bool} autoHide Pass `true` to automatically hide the notification after a while.
   */
  const setNotification = (message, type, autoHide = false) => setState(
    { type, message, autoHide },
  );

  const resetNotification = () => setState(defaultState);

  const { type, message, autoHide } = state;

  return {
    type,
    message,
    autoHide,
    setNotification,
    resetNotification,
  };
};
