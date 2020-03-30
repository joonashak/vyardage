import React, { useEffect } from 'react';
import { useStore } from 'react-hookstore';
import { Redirect } from 'react-router-dom';
import { logout } from '../../services/loginService';


export default () => {
  const [, setLoggedIn] = useStore('loggedIn');

  useEffect(() => {
    const asyncLogout = async () => {
      await logout();
      setLoggedIn(false);
    };
    asyncLogout();
  }, [setLoggedIn]);

  return (<Redirect to="/" />);
};
