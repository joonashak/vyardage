import React from 'react';
import { NotificationProvider } from './components/GlobalNotification/useNotification';
import { AuthenticationProvider } from './components/authentication/useAuthentication';
import { DataProvider } from './context/useData';


export default ({ children }) => (
  <AuthenticationProvider>
    <NotificationProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </NotificationProvider>
  </AuthenticationProvider>
);
