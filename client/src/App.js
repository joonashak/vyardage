import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeView from './components/views/HomeView';
import LoginView from './components/views/LoginView';

export default () => (
  <BrowserRouter>
    <CssBaseline />

    <Switch>
      <Route path="/login" exact component={LoginView} />
      <Route path="/" component={HomeView} />
    </Switch>
  </BrowserRouter>
);
