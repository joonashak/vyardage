import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { createStore, useStore } from 'react-hookstore';
import HomeView from './components/views/HomeView';
import LoginView from './components/views/LoginView';
import GlobalNotification from './components/GlobalNotification';
import { checkSession } from './services/loginService';


createStore('loggedIn', false);

export default () => {
  const [, setLoggedIn] = useStore('loggedIn');

  // Update login status when the application loads.
  useEffect(() => {
    const asyncCheck = async () => {
      const res = await checkSession();
      setLoggedIn(!res.error);
    };
    asyncCheck();
  }, [setLoggedIn]);

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />

        <Switch>
          <Route path="/login" exact component={LoginView} />
          <Route path="/" component={HomeView} />
        </Switch>

        <GlobalNotification />
      </BrowserRouter>
    </ThemeProvider>
  );
};
