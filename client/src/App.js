import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { createStore, useStore } from 'react-hookstore';
import { pink } from '@material-ui/core/colors';
import HomeView from './components/views/HomeView';
import LoginView from './components/views/LoginView';
import GlobalNotification from './components/GlobalNotification';
import { checkSession } from './services/loginService';
import Logout from './components/authentication/Logout';
import GameView from './components/views/GameView';


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
      secondary: {
        main: pink.A100,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />

        <Switch>
          <Route path="/login" exact component={LoginView} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/play" exact component={GameView} />
          <Route path="/" component={HomeView} />
        </Switch>

        <GlobalNotification />
      </BrowserRouter>
    </ThemeProvider>
  );
};
