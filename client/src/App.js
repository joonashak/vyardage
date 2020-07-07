import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import HomeView from './components/views/HomeView';
import LoginView from './components/views/LoginView';
import GlobalNotification from './components/GlobalNotification';
import Logout from './components/authentication/Logout';
import GameView from './components/views/GameView';
import SettingsView from './components/views/SettingsView';
import CombinedContext from './CombinedContext';


export default () => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      secondary: {
        main: pink.A100,
      },
    },
  });

  return (
    <CombinedContext>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />

          <Switch>
            <Route path="/login" exact component={LoginView} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/play" exact component={GameView} />
            <Route path="/settings" exact component={SettingsView} />
            <Route path="/" component={HomeView} />
          </Switch>

          <GlobalNotification />
        </BrowserRouter>
      </ThemeProvider>
    </CombinedContext>
  );
};
