import React from 'react';
import { NotificationProvider } from './components/GlobalNotification/useNotification';
import { AuthenticationProvider } from './components/authentication/useAuthentication';


export default ({ children }) => (
  <AuthenticationProvider>
    <NotificationProvider>
      {children}
    </NotificationProvider>
  </AuthenticationProvider>
);
