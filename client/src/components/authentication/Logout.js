import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../../services/loginService';
import useAuthentication from './useAuthentication';


export default () => {
  const { setLoggedIn } = useAuthentication();

  useEffect(() => {
    const asyncLogout = async () => {
      await logout();
      setLoggedIn(false);
    };
    asyncLogout();
  }, [setLoggedIn]);

  return (<Redirect to="/" />);
};
