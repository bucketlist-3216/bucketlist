import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';

import CreateView from './pages/CreateView';
import LandingPage from './pages/LandingPage';
import SwipeView from './pages/SwipeView';
import TripsPage from './pages/TripsPage';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path='/createview' component={CreateView} />
      <Route path='/swipeview' component={SwipeView} />
      <Route path='/user/:userId/trips' component={TripsPage} />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);
