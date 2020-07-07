import React from 'react';
import { NotificationProvider } from './components/GlobalNotification/useNotification';


export default ({ children }) => (
  <NotificationProvider>
    {children}
  </NotificationProvider>
);
