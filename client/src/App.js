import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import HomeView from './components/views/HomeView';
import LoginView from './components/views/LoginView';

export default () => {
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

      </BrowserRouter>
    </ThemeProvider>
  );
};
