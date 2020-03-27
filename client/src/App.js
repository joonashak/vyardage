import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeView from './components/views/HomeView';

export default () => (
  <BrowserRouter>
    <CssBaseline />

    <Switch>
      <Route path="/" component={HomeView} />
    </Switch>
  </BrowserRouter>
);
